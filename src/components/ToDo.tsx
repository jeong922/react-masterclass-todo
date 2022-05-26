import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Categories, customCategoryState, IToDo, toDoState } from '../atoms';
import styled from 'styled-components';

const List = styled.div`
  margin: 20px 0px 0px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 10px;
  list-style: none;
  width: 100%;
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
    margin-right: 5px;
    background-color: ${(prorps) => prorps.theme.btnBgColor};
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 5px;
    color: ${(props) => props.theme.textColor};
    padding: 5px 10px;
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

  const deleteToDo = () => {
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
              진행중
            </button>
          )}
          {category !== Categories.TO_DO && (
            <button name={Categories.TO_DO} onClick={onClick}>
              할 일
            </button>
          )}
          {category !== Categories.DONE && (
            <button name={Categories.DONE} onClick={onClick}>
              완료
            </button>
          )}

          {category !== Categories.DELETE && (
            <button name={Categories.DELETE} onClick={deleteToDo}>
              삭제
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
