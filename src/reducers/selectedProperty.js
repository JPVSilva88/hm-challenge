import { SELECT_PROPERTY } from '../actions/const';

function reducer(state = null, action) {
  switch (action.type) {

    case SELECT_PROPERTY: {
      return action.property;
    }

    default: {
      // Return original state if no actions were consumed
      return state;
    }
  }
}

export default reducer;
