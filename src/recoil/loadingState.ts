import { atom } from "recoil";

export const loadingState = atom<boolean | null>({
    key: 'loadingState',
    default: false
});