import { SET_COORDINATES } from './const';

function action(coordinates) {
    return { type: SET_COORDINATES, coordinates };
}

export default action;
