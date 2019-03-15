import React from 'react';
import ReactDOM from 'react-dom';
import AppForm from '../AppForm';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
