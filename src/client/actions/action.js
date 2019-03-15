const SET_NICK_NAME = 'SET_NICK_NAME';
const LOADING = 'LOADING';

export const Action = (nickName) => {
  return {
    type: SET_NICK_NAME,
    userNickName: nickName
  };
};

export const LoadingAction = (loadingType) => {
  return {
    type: LOADING,
    loadingType
  };
};
