import { atom, selector } from 'recoil';

export const loggedState = atom({
  key: 'logged',
  default: false,
});

const getInitialCartState = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart') as any) || [];
  }
  return [];
};

export const cartState = atom({
  key: 'cartState',
  default: getInitialCartState(),
});
