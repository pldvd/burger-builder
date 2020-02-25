import * as actionTypes from './index';
import { IngredientType } from '../../components/Burger/Burger';


export const changeAmount = (lessOrMore: string, ingredient: string) => {
  return { type: actionTypes.CHANGEAMOUNT, ingredient, lessOrMore };
}

export const cancel = () => {
  return { type: actionTypes.CANCELORDERS };
}

export const setIngredients = (ingredients:IngredientType) => {
  return {
    type: actionTypes.INIT,
    ingredients,
  }
}

export const init = () => {
  return (dispatch: any) => {
    setTimeout(() => dispatch(setIngredients({
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    })), 2000)
  }
}