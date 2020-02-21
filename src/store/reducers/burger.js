

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
    case 'CHANGEAMOUNT':
      const ingred = action.ingredient;
      const lessOrMore = action.lessOrMore;

      if (lessOrMore === 'less') {
        return {
          ingredients: {
            ...state.ingredients,
            [ingred]: state.ingredients[ingred] - 1,
            // [ingred]: state.ingredients[ingred] > 0 ? state.ingredients[ingred] - 1 : state.ingredients[ingred],
          },
          finalPrice: state.finalPrice > 4 ? state.finalPrice - IngredientPriceList[ingred] : state.finalPrice,
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

    default: return state;
  }
}

export default reducer;

// changeAmount = (lessOrMore: string, ingredient: string) => {
//   if (lessOrMore === 'less') {
//     this.setState(prevState => {
//       return {
//         ingredients: {
//           ...prevState.ingredients,
//           [ingredient]: prevState.ingredients[ingredient] - 1,
//         },
//         finalPrice: prevState.finalPrice - this.IngredientPriceList[ingredient],
//       }
//     }, () => this.checkIfPurchasable(this.state.ingredients)
//     );
//   } else if (lessOrMore === 'more') {
//     this.setState(prevState => {
//       return {
//         ingredients: {
//           ...prevState.ingredients,
//           [ingredient]: prevState.ingredients[ingredient] + 1,
//         },
//         finalPrice: prevState.finalPrice + this.IngredientPriceList[ingredient],
//       }
//     }, () => this.checkIfPurchasable(this.state.ingredients)
//     );
//   }
// }