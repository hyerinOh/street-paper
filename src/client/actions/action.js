const setNickname = 'setNickName';

export default function Action(nickName) {
  return {
    type: setNickname,
    userNickName: nickName
  };
}
