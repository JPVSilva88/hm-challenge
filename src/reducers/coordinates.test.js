import React from 'react';
import coordinates from './coordinates';
import { SET_COORDINATES } from '../actions/const';

it('Correctly returns the initial state', () => {
  expect(coordinates(undefined, {})).toEqual(null);
});

it('Correctly handles the Set Coordinates action', () => {
  const sampleCoordinates = {
    1: {
      lat: 1,
      lng: 1
    },
    2: {
      lat: 2,
      lng: 2
    }
  };
  const action = {
    type: SET_COORDINATES,
    coordinates: sampleCoordinates
  };
  expect(coordinates(undefined, action)).toEqual(sampleCoordinates);
});
