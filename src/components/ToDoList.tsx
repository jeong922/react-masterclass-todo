import { useRecoilValue } from 'recoil';
import { toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import ToggleBtn from './ToggleBtn';
import styled from 'styled-components';
import CreateCategory from './CreateCategory';

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  background-color: rgba(220, 228, 245, 0.4);
  -webkit-box-shadow: 5px 5px 15px 5px rgb(82, 82, 82, 0.5);
  box-shadow: 5px 5px 15px 5px rgb(82, 82, 82, 0.5);
  padding: 20px;
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

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TodoContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    display: none;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
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
        <CreateCategory />
        <MainContainer>
          <CreateToDo />
        </MainContainer>
        <TodoContainer>
          {toDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </TodoContainer>
      </Wrapper>
    </>
  );
}

export default ToDoList;
