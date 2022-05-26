import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, customCategoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

const FormContainer = styled.div`
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

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const saveToDo = useRecoilValue(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(saveToDo)); // JSON.stringify는 객체나 배열을 JSON 포맷의 문자열로 변환
  }, [saveToDo]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(handleValue)}>
        <input
          {...register('toDo', { required: 'Please write a To Do' })}
          placeholder="할일을 입력하세요."
        />
        <button>추가</button>
      </form>
    </FormContainer>
  );
}

export default CreateToDo;
