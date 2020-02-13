import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import styles from './CheckoutForm.module.scss';
import { IngredientType } from '../../../components/Burger/Burger';
import Axios from '../../../axios';

interface orderDataInterface {
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

interface CheckoutFormInterface {
  orderData: orderDataInterface,
  isLoading: boolean,
  formIsValid: boolean,
  formIsTouched: boolean,
  [i: string]: string | boolean | orderDataInterface
}

interface CheckoutFormProps extends RouteComponentProps {
  ingredients: IngredientType,
  finalPrice: number | null
}

class CheckoutForm extends Component<CheckoutFormProps, CheckoutFormInterface> {

  state = {
    orderData: {
      name: "",
      nameIsValid: true,
      email: "",
      emailIsValid: true,
      street: "",
      streetIsValid: true,
      postalCode: "",
      postalCodeIsValid: true,
      country: "",
      countryIsValid: true,
      deliveryMethod: "",
      deliveryMethodIsValid: true
    },
    isLoading: false,
    formIsValid: false,
    formIsTouched: false
  };

  handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(this.props.finalPrice, this.props.ingredients);

    this.setState({
      isLoading: true,
    })

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.finalPrice,
      customer: {
        name: this.state.orderData.name,
        email: this.state.orderData.email,
        address: {
          street: this.state.orderData.street,
          postalCode: this.state.orderData.postalCode,
          country: this.state.orderData.country
        },
        deliveryMethod: this.state.orderData.deliveryMethod
      }
    }

    Axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: false,
        });
        //missing a "success" UI message here
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
        });
        //missing an error UI message here
        this.props.history.push('/');
      });
  }

  validateInput = (input: string, validationRule: RegExp): boolean => {
    return validationRule.test(input);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = '';
    let nameIsValid = true;
    let currentValue = e.target.value;

    if (!this.state.formIsTouched) {
      this.setState({ formIsTouched: true });
    }

    switch (e.target.name) {
      case 'zip-code':
        name = 'postalCode';
        nameIsValid = this.validateInput(currentValue, /^\d{4,6}$/);
        break;
      case 'delivery-method':
        name = 'deliveryMethod';
        nameIsValid = true; //this is referencing a 'select' input, so no need to validate it: even if the user doesn't touch it, it should be fine
        break;
      case 'name':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^\w{2,} \w{3,}$/);
        break;
      case 'street':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^\d+\.? \w{3,} \w{3,}?$/);
        break;
      case 'email':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        break;
      case 'country':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /[a-zA-Z]{4,}/);
        break;
    }

    const orderDataCopy = { ...this.state.orderData } as orderDataInterface;
    orderDataCopy[name] = currentValue;
    orderDataCopy[`${name}isValid`] = nameIsValid;

    this.setState({ orderData: orderDataCopy });

    if (this.state.formIsTouched && this.state.orderData.nameIsValid && this.state.orderData.emailIsValid && this.state.orderData.countryIsValid && this.state.orderData.deliveryMethodIsValid && this.state.orderData.postalCodeIsValid) {
      this.setState({ formIsValid: true });
    }
  }

  render() {
    let form = (
      <div className={styles.CheckoutForm}>
        <h2>Enter your contact details please</h2>
        <form>
          <Input
            inputtype="input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name."
            onChange={this.handleInputChange}
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            id="street"
            placeholder="Enter your street name."
            onChange={this.handleInputChange}
          />
          <Input
            inputtype="input"
            type="text"
            name="zip-code"
            id="zip-code"
            placeholder="Enter your zip-code."
            onChange={this.handleInputChange}
          />
          <Input
            inputtype="input"
            type="text"
            name="country"
            id="country"
            placeholder="Enter your country."
            onChange={this.handleInputChange}
          />
          <Input
            inputtype="input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email."
            onChange={this.handleInputChange}
          />
          <Input
            inputtype="select"
            name="delivery-method"
            id="delivery-method"
            displayvalues={['Fastest', 'Cheapest']}
            onChange={this.handleInputChange}
          />
          <Button color={this.state.formIsValid ? 'green' : 'red'} clicked={this.handleSend} isDisabled={!this.state.formIsValid}>Send</Button>
        </form>
      </div>
    );

    if (this.state.isLoading) {
      form = (
        <div className={styles.CheckoutForm}>
          <Loader />
        </div>
      );
    }

    return form;
  }

}

export default withRouter(CheckoutForm);