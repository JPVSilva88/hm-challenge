import React from 'react';
import selectedProperty from './selectedProperty';
import { SELECT_PROPERTY } from '../actions/const';

it('Correctly returns the initial state', () => {
  expect(selectedProperty(undefined, {})).toEqual(null);
});

it('Correctly handles the Select Property action', () => {
  const sampleProperty = {
    id: 1,
    owner: "Joao"
  };
  const action = {
    type: SELECT_PROPERTY,
    property: sampleProperty
  };
  expect(selectedProperty(undefined, action)).toEqual(sampleProperty);
});
