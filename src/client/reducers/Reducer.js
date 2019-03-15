const initialState = {
  nickName: '',
  isLoading: false
};

export default function Reducer(state = initialState, action) {
  const copiedState = JSON.parse(JSON.stringify(state));
  const {
    type,
    loadingType,
    userNickName
  } = action;

  switch (type) {
    case 'SET_NICK_NAME':
      copiedState.nickName = userNickName;
      return copiedState;
    case 'LOADING':
      copiedState.isLoading = loadingType;
      return copiedState;
    default:
      return state;
  }
}
