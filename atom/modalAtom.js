import { atom } from "recoil";

export const modalState = atom({
    key: 'modalState',
    default: false, 
  });

export const postIdState = atom({
    key: 'postIdState',
    default: 'id', 
  });

export const navZIndex = atom({
  key: 'navZIndex',
  default: 'z-50 ease-out delay-75 duration-300',
})

export const containerZIndex = atom({
  key: 'containerZIndex',
  default: 'z-10',
})