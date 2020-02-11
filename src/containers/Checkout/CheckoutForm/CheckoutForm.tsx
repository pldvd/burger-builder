import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import styles from './CheckoutForm.module.scss';
import { IngredientType } from '../../../components/Burger/Burger';
import Axios from '../../../axios';

interface CustomerDataInterface {
  name: string,
  email: string,
  address: {
    street: string,
    postalCode: string,
    country: string
  }
}

interface CheckoutFormInterface {
  customerData: CustomerDataInterface,
  deliveryMethod: string,
  isLoading: boolean,
  [i: string]: string | boolean | CustomerDataInterface
}

interface CheckoutFormProps extends RouteComponentProps {
  ingredients: IngredientType,
  finalPrice: number | null
}

class CheckoutForm extends Component<CheckoutFormProps, CheckoutFormInterface> {

  state = {
    customerData: {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: "",
        country: ""
      }
    },
    deliveryMethod: "",
    isLoading: false
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
        name: this.state.customerData.name,
        email: this.state.customerData.email,
        address: {
          street: this.state.customerData.address.street,
          postalCode: this.state.customerData.address.postalCode,
          country: this.state.customerData.address.country
        }
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

    switch (e.target.name) {
      case ('name'):
        this.setState({ 
          customerData: { ...this.state.customerData, name: e.target.value } 
        });
        break;
      case ('street'):
        this.setState({
          customerData: {
            ...this.state.customerData,
            address: {
              ...this.state.customerData.address,
              street: e.target.value
            }
          }
        });
        break;
      case ('zip-code'):
        this.setState({
          customerData: {
            ...this.state.customerData,
            address: {
              ...this.state.customerData.address,
              postalCode: e.target.value
            }
          }
        });
        break;
      case ('country'):
        this.setState({
          customerData: {
            ...this.state.customerData,
            address: {
              ...this.state.customerData.address,
              country: e.target.value
            }
          }
        });
        break;
      case ('email'):
        this.setState({ 
          customerData: { ...this.state.customerData, email: e.target.value } 
        });
        break;
      case ('delivery-method'):
        this.setState({ deliveryMethod: e.target.value });
        break;
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
          <Button color="green" clicked={this.handleSend}>Send</Button>
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