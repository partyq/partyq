export const SET_USER_NAME = 'SET_USER_NAME';

export const setUserName = (username: string) => ({
    type: SET_USER_NAME,
    username
});