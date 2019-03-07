const initialState = {
  nickName: ''
};

export default function Reducer(state = initialState, action) {
  const copiedState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'setNickName':
      copiedState.nickName = action.userNickName;
      return copiedState;

    default:
      return state;
  }
}
