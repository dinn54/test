import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist'

export const userState = atom<any>({
    key: "user",
    default: null,
})