import { SET_COORDINATES } from '../actions/const';

function reducer(state = null, action) {
  switch (action.type) {

    case SET_COORDINATES: {
      return action.coordinates;
    }

    default: {
      // Return original state if no actions were consumed
      return state;
    }
  }
}

export default reducer;
