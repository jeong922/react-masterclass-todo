import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
  toDoState,
} from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import ToggleBtn from './ToggleBtn';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto;
  div {
    &:first-child {
      margin-left: auto;
    }
  }
  h1 {
    margin-bottom: 25px;
    font-size: 24px;
    font-weight: 600;
  }
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 80%;
      height: 25px;
      border: none;
      outline: none;
      font-size: 16px;
      padding: 0 16px;
      margin-right: 10px;
      border-radius: 5px;
    }
    button {
      border: none;
      height: 25px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  select {
    margin-bottom: 10px;
    height: 25px;
    border: none;
    outline: none;
    border-radius: 5px;
    width: 60%;
  }
  button {
    border: none;
    height: 25px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

interface IForm {
  customCategory: string;
}

function ToDoList() {
  const [customCategory, setcustomCategory] =
    useRecoilState(customCategoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValue = ({ customCategory }: IForm) => {
    setcustomCategory((data) => [
      ...data,
      { title: customCategory, id: Date.now() },
    ]);
    setValue('customCategory', '');
  };
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onDeletCategory = () => {
    setToDos((oldToDos) => {
      const targetcategory = customCategory
        .filter((item) => category === item.title)
        .map((value) => value.title);
      return [
        ...oldToDos.filter((item) => targetcategory[0] !== item.category),
      ];
    });
    setcustomCategory((oldCategory) => {
      const cusTargetIndex = oldCategory.findIndex((category) =>
        customCategory.map((item) => item.id === category.id)
      ); // 만족하는 조건 없으면 -1 리턴
      return [
        ...oldCategory.slice(0, cusTargetIndex),
        ...oldCategory.slice(cusTargetIndex + 1),
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(customCategory)); // JSON.stringify는 객체나 배열을 JSON 포맷의 문자열로 변환
  }, [customCategory]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>TODO</title>
        </Helmet>
      </HelmetProvider>
      <Wrapper>
        <ToggleBtn />
        <h1>TODO LIST</h1>
        <TopContainer>
          <form onSubmit={handleSubmit(handleValue)}>
            <input
              {...register('customCategory', {
                required: 'Please write a category',
              })}
              placeholder="카테고리를 입력하세요."
              type="text"
            />
            <button>추가</button>
          </form>
        </TopContainer>
        <MainContainer>
          <CategoriesContainer>
            <select value={category} onInput={onInput}>
              <option value={Categories.TO_DO}>할 일</option>
              <option value={Categories.DOING}>진행중</option>
              <option value={Categories.DONE}>완료</option>
              {customCategory.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
            {customCategory &&
              customCategory.map((custom) => {
                if (custom.title === category) {
                  return (
                    <button key={custom.id} onClick={onDeletCategory}>
                      카테고리 삭제
                    </button>
                  );
                }
              })}
            {/* <button onClick={onDeletCategory}>카테고리 삭제</button> */}
          </CategoriesContainer>
          <CreateToDo />
        </MainContainer>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Wrapper>
    </>
  );
}

export default ToDoList;
