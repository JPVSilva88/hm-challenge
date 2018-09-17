import React from 'react';
import selectProperty from './selectProperty';
import { SELECT_PROPERTY } from './const';

it('Correctly creates a select property action', () => {
  const property = {
    id: 1,
    owner: "Joao"
  };
  const expectedAction = {
    type: SELECT_PROPERTY,
    property
  };
  expect(selectProperty(property)).toEqual(expectedAction);
});
