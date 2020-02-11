import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import styles from './CheckoutForm.module.scss';
import { IngredientType } from '../../../components/Burger/Burger';
import Axios from '../../../axios';

interface CheckoutFormInterface {
  customerData: {
    name: string,
    email: string,
    address: {
      street: string,
      postalCode: string,
    }
  },
  orderDetails: {
    ingredients: IngredientType,
    finalPrice: number | null
  }
  isLoading: boolean,
}

interface CheckoutFormProps extends RouteComponentProps {
  ingredients: IngredientType,
  finalPrice: number | null
}

class CheckoutForm extends Component<CheckoutFormProps, CheckoutFormInterface> {

  state = {} as CheckoutFormInterface;

  handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(this.props);

    this.setState({
      isLoading: true,
    })

    const order = {
      ingredients: this.state.orderDetails.ingredients,
      price: this.state.orderDetails.finalPrice,
      customer: {
        name: 'Peter Pan',
        email: 'bla@bla.com',
        address: {
          street: 'Wendy str. 23',
          postalCode: '2030'
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

  componentDidMount() {
    this.setState({
      orderDetails: {
        ingredients: this.props.ingredients,
        finalPrice: this.props.finalPrice
      }
    });
  }

  render() {
    let form = (
      <div className={styles.CheckoutForm}>
        <h2>Enter your contact details please</h2>
        <form>
          <Input inputtype="input" type="text" name="name" id="name" placeholder="Enter your name." />
          <Input inputtype="input" type="text" name="street" id="street" placeholder="Enter your street name." />
          <Input inputtype="input" type="text" name="zip-code" id="zip-code" placeholder="Enter your zip-code." />
          <Input inputtype="input" type="text" name="country" id="country" placeholder="Enter your country." />
          <Input inputtype="input" type="email" name="email" id="email" placeholder="Enter your email." />
          <Input inputtype="select" name="delivery-method" id="delivery-method" displayvalues={['Fastest', 'Cheapest']} />
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