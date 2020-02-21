import { Ingredients } from '../../components/BurgerControls/BurgerControls';

export interface OrdersInterface {
  ingredients: Ingredients,
  price: number,
  id: string,
}