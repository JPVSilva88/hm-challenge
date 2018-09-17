import React from 'react';
import { App } from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a busy spinner if no coordinates are passed', () => {
  const app = shallow(<App />);

  expect(app.find('.busy-spinner').length).toBe(1);
});

it('not to render a busy spinner if coordinates are passed', () => {
  const coordinates = {
    1: {
      lat: 1,
      lng: 1
    },
    2: {
      lat: 2,
      lng: 2
    }
  };
  const app = shallow(<App coordinates={coordinates}/>);

  expect(app.find('.busy-spinner').length).toBe(0);
});
