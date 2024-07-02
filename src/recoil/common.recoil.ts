import { atom, selector } from 'recoil';

const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
    if(typeof window !== 'undefined'){
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    }
    onSet((newValue: any, _: any, isReset: any) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const loggedState = atom({
  key: 'loggedState',
  default: false,
  effects: [localStorageEffect('logged')],
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
