import {CHANGEAMOUNT, CANCELORDERS } from '../actions/index';


const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  finalPrice: 4
}

const reducer = (state = initialState, action) => {
  const IngredientPriceList = {
    salad: .5,
    cheese: 1,
    bacon: 1,
    meat: 2,
  }

  switch (action.type) {
    case CHANGEAMOUNT:
      const ingred = action.ingredient;
      const lessOrMore = action.lessOrMore;

      if (lessOrMore === 'less') {
        return {
          ingredients: {
            ...state.ingredients,
            [ingred]: state.ingredients[ingred] - 1,
          },
          finalPrice: state.finalPrice - IngredientPriceList[ingred],
        }
      } else if (lessOrMore === 'more') {
        return {
          ingredients: {
            ...state.ingredients,
            [ingred]: state.ingredients[ingred] + 1,
          },
          finalPrice: state.finalPrice + IngredientPriceList[ingred],
        }
      }
    case CANCELORDERS:
      return initialState;
    default: return state;
  }
}

export default reducer;
