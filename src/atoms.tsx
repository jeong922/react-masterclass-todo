import { type } from 'os';
import { atom, selector } from 'recoil';
import { darkTheme, lightTheme } from './theme';

// export enum Categories {
//   'TO_DO' = 'TO_DO',
//   'DOING' = 'DOING',
//   'DONE' = 'DONE',
//   'DELETE' = 'DELETE',
// }

export type Categories = 'TO_DO' | 'DOING' | 'DONE' | 'DELETE';

export interface ICategorties {
  title: string;
  id: number;
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

const getSaveToDos = localStorage.getItem('todos');
const parseToDo = JSON.parse(getSaveToDos as any);
const getSaveCategory = localStorage.getItem('category');
const parseCategory = JSON.parse(getSaveCategory as any);

export const categoryState = atom<Categories>({
  key: 'category',
  default: 'TO_DO',
});

export const customCategoryState = atom<ICategorties[]>({
  key: 'customCategory',
  default: parseCategory !== null ? parseCategory : [],
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: parseToDo !== null ? parseToDo : [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

//... THEME ...
export const getTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    return darkTheme;
  }
  return lightTheme;
};

export const isDarkAtom = atom({
  key: 'isDark',
  default: getTheme(),
});
