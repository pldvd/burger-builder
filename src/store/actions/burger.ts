import * as actionTypes from './index';

export const changeAmount = (lessOrMore: string, ingredient: string) => {
  return { type: actionTypes.CHANGEAMOUNT, ingredient, lessOrMore };
}

export const cancel = () => {
  return { type: actionTypes.CANCELORDERS };
}
