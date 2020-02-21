import { RouteComponentProps } from 'react-router-dom';

export interface BurgerBuilderState {
  ingredients: any,
  finalPrice: number,
  isPurchasable: boolean,
  modalIsOpen: boolean,
  isLoading: boolean,
  hasError: boolean,
  httpErrorMsg: null | { message: string }
}

export interface BurgerBuilderProps extends RouteComponentProps {
  httpError: null | { message: string }
}

export interface IngredientPriceListInterface {
  salad: number,
  cheese: number,
  bacon: number,
  meat: number,
  [key: string]: number
}
