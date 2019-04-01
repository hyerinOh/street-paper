import Reducer, { initialState } from '../Reducer';
import * as Action from '../../actions/action';

describe('nick name reducer', () => {
  it('should return the initial state', () => {
    expect(Reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NICK_NAME', () => {
    expect(
      Reducer({}, {
        type: Action.SET_NICK_NAME,
        userNickName: 'hyerin'
      })
    ).toEqual({
      nickName: 'hyerin',
    });
  });
});
