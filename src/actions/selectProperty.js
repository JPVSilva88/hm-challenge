import { SELECT_PROPERTY } from './const';

function action(property) {
    return { type: SELECT_PROPERTY, property };
}

export default action;
