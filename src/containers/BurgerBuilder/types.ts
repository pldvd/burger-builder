import { RouteComponentProps } from 'react-router-dom';
import { IngredientType } from '../../components/Burger/Burger';
import { BurgerState } from '../../store/types';

export interface BurgerBuilderState {
  isPurchasable: boolean,
  modalIsOpen: boolean,
}

export interface BurgerBuilderProps extends RouteComponentProps {
  httpError: null | { message: string },
  ingredients: IngredientType,
  finalPrice: number,
  changeAmount: () => BurgerState,
  cancel: () => BurgerState,
  isLoading: boolean,
  hasError: boolean,
  errorMsg: string,
  token: boolean,
  isPurchased: boolean,
  init: () => BurgerState
}

export interface IngredientPriceListInterface {
  salad: number,
  cheese: number,
  bacon: number,
  meat: number,
  [key: string]: number
}
