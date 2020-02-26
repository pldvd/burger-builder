import { INIT, CHANGEAMOUNT, CANCELORDERS, DOWNLOADFAILED } from '../actions/index';


const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  finalPrice: 4,
  isLoading: true,
  hasError: false,
  errorMsg: null,
}

const reducer = (state = initialState, action) => {
  const IngredientPriceList = {
    salad: .5,
    bacon: 1,
    cheese: 1,
    meat: 2,
  }

  switch (action.type) {
    case INIT:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        isLoading: false,
        finalPrice: initialState.finalPrice
      };
    case DOWNLOADFAILED:
      return {
        ...state,
        hasError: true,
        errorMsg: action.errorMsg
      };
    case CHANGEAMOUNT:
      const ingred = action.ingredient;
      const lessOrMore = action.lessOrMore;

      if (lessOrMore === 'less') {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [ingred]: state.ingredients[ingred] - 1,
          },
          finalPrice: state.finalPrice - IngredientPriceList[ingred],
        }
      } else if (lessOrMore === 'more') {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [ingred]: state.ingredients[ingred] + 1,
          },
          finalPrice: state.finalPrice + IngredientPriceList[ingred],
        }
      }
    case CANCELORDERS:
      return {
        ...initialState,
        isLoading: false,
      };
    default: return state;
  }
}

export default reducer;
