import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  Categories,
  categoryState,
  customCategoryState,
  toDoState,
} from '../atoms';

const MakeCategory = styled.div`
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
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      height: 25px;
      border-radius: 5px;
      cursor: pointer;
      svg {
        fill: ${(props) => props.theme.btnBgColor};
        height: 20px;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
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
    padding: 0 5px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    height: 25px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    svg {
      height: 20px;
      fill: ${(props) => props.theme.btnBgColor};
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

interface IForm {
  customTitle: string;
}

function CreateCategory() {
  const [customCategory, setcustomCategory] =
    useRecoilState(customCategoryState);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValue = ({ customTitle }: IForm) => {
    const newTitle = customCategory
      .filter((item) => customTitle === item.title)
      .map((value) => value.title);
    if (newTitle[0] !== customTitle) {
      setcustomCategory((data) => [
        ...data,
        { title: customTitle, id: Date.now() },
      ]);
      setValue('customTitle', '');
    }
  };
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
      const cusTargetIndex = customCategory
        .filter((item) => category === item.title)
        .map((value) => value.title);
      return [
        ...oldCategory.filter((item) => cusTargetIndex[0] !== item.title),
      ];
    });
  };

  useEffect(() => {
    localStorage.setItem('category', JSON.stringify(customCategory)); // JSON.stringify는 객체나 배열을 JSON 포맷의 문자열로 변환
  }, [customCategory]);
  return (
    <>
      <MakeCategory>
        <form onSubmit={handleSubmit(handleValue)}>
          <input
            {...register('customTitle', {
              required: 'Please write a category',
            })}
            placeholder="카테고리를 입력하세요."
            type="text"
          />
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
            </svg>
          </button>
        </form>
      </MakeCategory>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z" />
                  </svg>
                </button>
              );
            }
          })}
      </CategoriesContainer>
    </>
  );
}
export default CreateCategory;
