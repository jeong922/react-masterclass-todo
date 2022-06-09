import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
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

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const saveToDo = useRecoilValue(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: toDo, id: Date.now(), category },
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
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
          </svg>
        </button>
      </form>
    </FormContainer>
  );
}

export default CreateToDo;
