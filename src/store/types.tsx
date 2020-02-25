type IngredientType = {
  salad: number,
  cheese: number,
  bacon: number,
  meat: number,
  [index: string] : number,
}

export interface BurgerState {
  ingredients: IngredientType,
  finalPrice: number,
  isLoading: boolean,
  hasError: boolean,
  errorMsg: string,
}