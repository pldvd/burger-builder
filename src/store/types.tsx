type IngredientType = {
  salad: number;
  cheese: number;
  bacon: number;
  meat: number;
  [index: string] : number;
}

export interface BurgerState {
  ingredients: IngredientType,
  finalPrice: number
}