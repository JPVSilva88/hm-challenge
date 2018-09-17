import React from 'react';
import setCoordinates from './setCoordinates';
import { SET_COORDINATES } from './const';

it('Correctly creates a set coordinates action', () => {
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
  const expectedAction = {
    type: SET_COORDINATES,
    coordinates
  };
  expect(setCoordinates(coordinates)).toEqual(expectedAction);
});
