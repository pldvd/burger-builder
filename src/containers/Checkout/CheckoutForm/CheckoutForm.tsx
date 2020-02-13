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
  email: string,
  street: string,
  postalCode: string,
  country: string,
  deliveryMethod: string,
  [i: string]: string
}

interface CheckoutFormInterface {
  orderData: orderDataInterface,
  isLoading: boolean,
  formIsValid: boolean,
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
      email: "",
      street: "",
      postalCode: "",
      country: "",
      deliveryMethod: ""
    },
    isLoading: false,
    formIsValid: false
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

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = '';

    //invoke custom validation funciton here -- to be written

    switch (e.target.name) {
      case 'zip-code':
        name = 'postalCode';
        break;
      case 'delivery-method':
        name = 'deliveryMethod';
        break;
      default:
        name = e.target.name;
    }

    const orderDataCopy = { ...this.state.orderData } as orderDataInterface;
    orderDataCopy[name] = e.target.value;

    this.setState({ orderData: orderDataCopy });
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