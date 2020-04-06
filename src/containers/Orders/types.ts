import { Ingredients } from '../../components/BurgerControls/BurgerControls';

export interface OrdersProps {
  ingredients: Ingredients,
  price: number,
  id: string,
}