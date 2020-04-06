import { RouteComponentProps } from 'react-router-dom';
import { IngredientType } from '../../../components/Burger/Burger';


export interface orderDataInterface {
  name: string,
  nameIsValid: boolean,
  email: string,
  emailIsValid: boolean,
  street: string,
  streetIsValid: boolean,
  postalCode: string,
  postalCodeIsValid: boolean,
  country: string,
  countryIsValid: boolean,
  deliveryMethod: string,
  deliveryMethodIsValid: boolean,
  [i: string]: string | boolean
}

export interface orderInterface {
  name: string,
  email: string,
  emailIsValid: boolean,
  street: string,
  streetIsValid: boolean,
  postalCode: string,
  postalCodeIsValid: boolean,
  country: string,
  countryIsValid: boolean,
  deliveryMethod: string,
  deliveryMethodIsValid: boolean,
  [i: string]: string | boolean
}

export interface CheckoutFormInterface {
  orderData: orderDataInterface,
  isLoading: boolean,
  formIsValid: boolean,
  formIsTouched: boolean,
  touchedFields: string[],
  [i: string]: string | boolean | orderDataInterface | string[]
}

export interface CheckoutFormProps extends RouteComponentProps {
  ingredients: IngredientType,
  finalPrice: number | null,
  isLoading: boolean,
  placeOrder: (order: any, token: string) => any,
  orderStartLoading: () => any,
  token: string 
}
