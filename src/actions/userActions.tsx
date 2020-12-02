import { iUser } from "../utility/types";

export const SET_USER = 'SET_USER';

export const setUser = (user: iUser) => ({
    type: SET_USER,
    user
});