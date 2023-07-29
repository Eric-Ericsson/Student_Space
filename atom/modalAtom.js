import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const contactInfoModalState = atom({
  key: "contactInfoModalState",
  default: false,
});

export const postModal = atom({
  key: "postModal",
  default: false,
});

export const businessModal = atom({
  key: "businessModal",
  default: false,
});

export const profileModalState = atom({
  key: "profileModalState",
  default: false,
});

export const imageBannerModalState = atom({
  key: "imageBannerModalState",
  default: false,
});

export const imageCategory = atom({
  key: "imageCategory",
  default: "",
});

export const aModalOpened = atom({
  key: "aModalOpened",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "id",
});

export const ueser_id = atom({
  key: "ueser_id",
  default: "id",
});

export const navZIndex = atom({
  key: "navZIndex",
  default: "z-50 ease-out delay-75 duration-300",
});

export const containerZIndex = atom({
  key: "containerZIndex",
  default: "z-10",
});

export const showPassword = atom({
  key: "showPassword",
  default: true,
});

export const showConfirmPassword = atom({
  key: "showConfirmPassword",
  default: true,
});
