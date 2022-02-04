import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, customCategoryState, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const List = styled.div`
  margin: 20px 0px 0px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 10px;
  list-style: none;
  width: 450px;
  height: auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  span {
    width: 100%;
    font-size: 18px;
    margin-left: 5px;
  }
`;

const Btns = styled.div`
  margin-top: 10px;
  button {
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.border};
  }
  button:hover {
    transform: scale(1.1);
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategory = useRecoilValue(customCategoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <List>
      <li>
        <span>{text}</span>
        <Btns>
          {category !== Categories.DOING && (
            <button name={Categories.DOING} onClick={onClick}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
                ></path>
              </svg>
              {/* doing */}
            </button>
          )}
          {category !== Categories.TO_DO && (
            <button name={Categories.TO_DO} onClick={onClick}>
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
                ></path>
              </svg>
              {/* todo */}
            </button>
          )}
          {category !== Categories.DONE && (
            <button name={Categories.DONE} onClick={onClick}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                ></path>
              </svg>
              {/* done */}
            </button>
          )}
          {/* {category !== Categories.DELETE && (
        <button name={Categories.DELETE} onClick={onClick}>
          Delete
        </button>
      )} */}

          {category !== Categories.DELETE && (
            <button name={Categories.DELETE} onClick={deleteToDo}>
              <svg
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                ></path>
              </svg>
              {/* delete */}
            </button>
          )}
          {customCategory &&
            customCategory.map((customCategory) => {
              if (customCategory.title !== category) {
                return (
                  <button
                    name={customCategory.title}
                    onClick={onClick}
                    key={customCategory.id}
                  >
                    {customCategory.title}
                  </button>
                );
              }
            })}
        </Btns>
      </li>
    </List>
  );
}

export default ToDo;
