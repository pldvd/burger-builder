import * as actionTypes from './index';
import { IngredientType } from '../../components/Burger/Burger';
import axios from '../../axios';


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
    axios.get('/ingredients.json')
    .then(response => dispatch(setIngredients(response.data)))
  }
}