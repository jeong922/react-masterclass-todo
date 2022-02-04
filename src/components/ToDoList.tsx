import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import ToggleBtn from "./ToggleBtn";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const TopContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MainContainer = styled.div`
  display: flex;
`;

interface IForm {
  customCategory: string;
}

function ToDoList() {
  const [customCategory, setcustomCategory] =
    useRecoilState(customCategoryState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValue = ({ customCategory }: IForm) => {
    setcustomCategory((data) => [
      ...data,
      { title: customCategory, id: Date.now() },
    ]);
    setValue("customCategory", "");
  };

  // ............................................
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log("category", category);
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(customCategory)); // JSON.stringify는 객체나 배열을 JSON 포맷의 문자열로 변환
  }, [customCategory]);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>TODO</title>
        </Helmet>
      </HelmetProvider>
      <Wrapper>
        <TopContainer>
          <form onSubmit={handleSubmit(handleValue)}>
            <input
              {...register("customCategory", {
                required: "Please write a category",
              })}
              placeholder="Write a category"
              type="text"
            />
            <button>Add</button>
          </form>
          <ToggleBtn />
        </TopContainer>
        <MainContainer>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
            {customCategory.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <CreateToDo />
        </MainContainer>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Wrapper>
    </div>
  );
}

export default ToDoList;
