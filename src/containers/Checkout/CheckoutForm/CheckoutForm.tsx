import React, { Component, Fragment } from 'react';
import Button from '../../../components/UI/Button/Button';

interface CheckoutFormInterface {
  name: string,
  email: string,
  address: {
    street: string,
    postalCode: string,
  }

}

class CheckoutForm extends Component<{}, CheckoutFormInterface> {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render() {
    return (
      <Fragment>
        <h4>Enter your contact details please</h4>
        <form>
          <input type="text" name="name" placeholder="Enter your name."/>
          <input type="email" name="email" placeholder="Enter your email."/>
          <input type="text" name="street" placeholder="Enter your street name."/>
          <input type="text" name="postal" placeholder="Enter your postal code."/>
          <Button color="green" clicked={() => console.log('hello')}>Send</Button>
        </form>
      </Fragment>
    )
  }

}

export default CheckoutForm;