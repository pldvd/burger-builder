// import BurgerState from '../types';
import * as actionTypes from './actionTypes';

export const changeAmount = (lessOrMore, ingredient) => {
  return { type: actionTypes.CHANGEAMOUNT, ingredient, lessOrMore };
}

export const cancel = () => {
  return {type: actionTypes.CANCELORDERS};
}

    // changeAmount: (lessOrMore: string, ingredient: string): BurgerState => dispatch({ type: 'CHANGEAMOUNT', ingredient, lessOrMore }),
    // cancel: () => dispatch({type:'CANCELORDERS'})