import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Loader/Loader';
import styles from './CheckoutForm.module.scss';
import { orderDataInterface, CheckoutFormInterface, CheckoutFormProps } from './types';
import { connect } from 'react-redux';
import { orderStartLoading, placeOrder } from '../../../store/actions/order-actions';


class CheckoutForm extends Component<CheckoutFormProps, CheckoutFormInterface> {

  state = {
    orderData: {} as orderDataInterface,
    isLoading: false,
    formIsValid: false,
    formIsTouched: false,
    touchedFields: [] as string[]
  };

  handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.orderStartLoading();

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

    this.props.placeOrder(order, this.props.token);
  }

  validateInput = (input: string, validationRule: RegExp): boolean => {
    return validationRule.test(input);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = '';
    let nameIsValid = false;
    let currentValue = e.target.value;

    switch (e.target.name) {
      case 'zip-code':
        name = 'postalCode';
        nameIsValid = this.validateInput(currentValue, /^\d{4,6}$/);
        break;
      case 'delivery-method':
        name = 'deliveryMethod';
        nameIsValid = this.validateInput(currentValue, /Fastest|Cheapest/);
        break;
      case 'name':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^\w{2,} \w{3,}$/);
        break;
      case 'address':
        name = 'street';
        nameIsValid = this.validateInput(currentValue, /^\d+\.? \w{3,} \w{3,}?.?$/);
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
    orderDataCopy[`${name}IsValid`] = nameIsValid;

    const touchedFieldsCopy = [...this.state.touchedFields].concat(e.target.name);

    if (!this.state.formIsTouched) {
      this.setState({ formIsTouched: true });
    }
    const isFormValid = (state: CheckoutFormInterface): boolean => {
      return (state.formIsTouched && state.orderData.nameIsValid && state.orderData.emailIsValid && state.orderData.countryIsValid && state.orderData.deliveryMethodIsValid && state.orderData.postalCodeIsValid);
    }

    this.setState({ orderData: orderDataCopy, touchedFields: touchedFieldsCopy }, () => {
      this.setState({ formIsValid: isFormValid(this.state) }) //need to validate form once orderData state is surely updated, hence the setState in callback
    });
  }

  render() {
    let form = (
      <div className={styles.CheckoutForm}>
        <h2>Enter your contact details please</h2>
        <form onSubmit={this.handleSend}>
          <Input
            inputtype="input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name."
            onChange={this.handleInputChange}
            isValid={this.state.orderData.nameIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Input
            inputtype="input"
            type="text"
            name="address"
            id="address"
            placeholder="Enter house number followed by street name."
            onChange={this.handleInputChange}
            isValid={this.state.orderData.streetIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Input
            inputtype="input"
            type="text"
            name="zip-code"
            id="zip-code"
            placeholder="Enter your zip-code."
            onChange={this.handleInputChange}
            isValid={this.state.orderData.postalCodeIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Input
            inputtype="input"
            type="text"
            name="country"
            id="country"
            placeholder="Enter your country."
            onChange={this.handleInputChange}
            isValid={this.state.orderData.countryIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Input
            inputtype="input"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email."
            onChange={this.handleInputChange}
            isValid={this.state.orderData.emailIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Input
            inputtype="select"
            name="delivery-method"
            id="delivery-method"
            displayvalues={['Please select...', 'Fastest', 'Cheapest']}
            onChange={this.handleInputChange}
            isValid={this.state.orderData.deliveryMethodIsValid}
            touchedFields={this.state.touchedFields}
          />
          <Button color={'green'} isDisabled={!this.state.formIsValid}>Send</Button>
        </form>
      </div>
    );

    if (this.props.isLoading) {
      form = (
        <div className={styles.CheckoutForm}>
          <Loader />
        </div>
      );
    }

    return form;
  }

}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burger.ingredients,
    finalPrice: state.burger.finalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    orderStartLoading: () => dispatch(orderStartLoading()),
    placeOrder: (order: any, token: string) => dispatch(placeOrder(order, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutForm));