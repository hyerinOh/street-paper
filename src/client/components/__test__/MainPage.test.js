import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainPage from '../MainPage';

Enzyme.configure({ adapter: new Adapter() });

const actualNode = shallow(<MainPage />)

actualNode.find('.startBtn').simulate('click');

// describe('submit', () => {
//   it('should call', () => {
//     const a = jest.fn();
//     const b = enzymeWrapper.find('.startBtn');
//     b.simulate('click');
//     a.to
//   })
// })
