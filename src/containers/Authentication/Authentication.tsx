import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { AuthProps, AuthStateInterface } from './types';

class Authentication extends Component<AuthProps, AuthStateInterface> {

  state: AuthStateInterface = {
    isLoading: false,
    formIsValid: false,
    formIsTouched: false,
    touchedFields: [] as string[],
    password: '',
    email: '',
    passwordIsValid: false,
    emailIsValid: false
  };

  validateInput = (input: string, validationRule: RegExp): boolean => {
    return validationRule.test(input);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = '';
    let nameIsValid = false;
    let currentValue = e.target.value;

    switch (e.target.name) {
      case 'email':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        break;
      case 'password':
        name = e.target.name;
        nameIsValid = this.validateInput(currentValue, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/); //minimum 6 characters, one letter and one number
        break;
    }

    const stateCopy = { ...this.state };
    stateCopy[name] = currentValue;
    stateCopy[`${name}IsValid`] = nameIsValid;
    const touchedFieldsCopy = [...this.state.touchedFields].concat(e.target.name);
    stateCopy.touchedFields = touchedFieldsCopy;

    if (!this.state.formIsTouched) {
      this.setState({ formIsTouched: true });
    }

    const isFormValid = (state: AuthStateInterface): boolean => {
      return (state.formIsTouched && state.emailIsValid && state.passwordIsValid)
    }

    this.setState(stateCopy, () => {
      this.setState({ formIsValid: isFormValid(this.state) }) //need to validate form once orderData state is surely updated, hence the setState in callback
    });
  }

  render() {

    return (
      <form onSubmit={() => console.log('csumi')}>
        <Input
          inputtype="email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email."
          onChange={this.handleInputChange}
          isValid={this.state.emailIsValid}
          touchedFields={this.state.touchedFields}
        />
        <Input
          inputtype="password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password."
          onChange={this.handleInputChange}
          isValid={this.state.emailIsValid}
          touchedFields={this.state.touchedFields}
        />
        <Button color={'green'} isDisabled={!this.state.formIsValid}>Send</Button>
      </form>
    )
  }
}

export default Authentication;