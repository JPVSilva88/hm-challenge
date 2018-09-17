import React from 'react';
import { Table } from './Table';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Table />);
});

it('renders a header with 4 columns', () => {
  const table = shallow(<Table />);

  expect(table.find('.table__header').children().length).toBe(4);
});

it('renders two rows if two properties are passed', () => {
  const intl = new Intl.NumberFormat('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const properties = [
    {
      airbnbId: 1,
      owner: "Joao",
      incomeGenerated: 1,
      address: {}
    },
    {
      airbnbId: 2,
      owner: "Pedro",
      incomeGenerated: 2,
      address: {}
    }
  ];
  const table = shallow(<Table
      properties={properties}
      intl={intl}
  />);

  expect(table.find('.table__row').length).toBe(2);
});

it('renders icons for each row correctly depending on if a property is within the service area', () => {
  const intl = new Intl.NumberFormat('en-GB', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const properties = [
    {
      airbnbId: 1,
      owner: "Joao",
      incomeGenerated: 1,
      address: {}
    },
    {
      airbnbId: 2,
      owner: "Pedro",
      incomeGenerated: 2,
      address: {}
    },
    {
      airbnbId: 3,
      owner: "Silva",
      incomeGenerated: 3,
      address: {}
    }
  ];

  const coordinates = {
    1: {
      lat: 1,
      lng: 1,
      isWithin: true
    },
    2: {
      lat: 2,
      lng: 2,
      isWithin: false
    }
  };
  const table = shallow(<Table
      properties={properties}
      intl={intl}
      coordinates={coordinates}
  />);

  expect(table.find('.table__row').at(0).find('.table__circle').hasClass('table__circle--yes')).toBe(true);
  expect(table.find('.table__row').at(1).find('.table__circle').hasClass('table__circle--no')).toBe(true);
  expect(table.find('.table__row').at(2).find('.table__circle').hasClass('table__circle--unknown')).toBe(true);
});
