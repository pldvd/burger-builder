import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { AuthProps, AuthStateInterface } from './types';
import { connect } from 'react-redux';
import { auth } from '../../store/actions'; //since we are importing from a file there named index.js, no need to further specify path
import styles from './Authentication.module.scss';

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
        nameIsValid = this.validateInput(currentValue, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/); //minimum 6 characters, one lowercase letter, one uppercase letter and one number
        break;
    }

    const stateCopy = { ...this.state };
    stateCopy.formIsTouched = true;
    stateCopy[name] = currentValue;
    stateCopy[`${name}IsValid`] = nameIsValid;
    const touchedFieldsCopy = [...this.state.touchedFields].concat(e.target.name);
    stateCopy.touchedFields = touchedFieldsCopy;

    const isFormValid = (state: AuthStateInterface): boolean => {
      return (state.formIsTouched && state.emailIsValid && state.passwordIsValid)
    }

    this.setState(stateCopy, () => {
      this.setState({ formIsValid: isFormValid(this.state) }) //need to validate form once orderData state is surely updated, hence the setState in callback
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('csumi');
    this.props.authenticate(this.state.email, this.state.password);
  }

  render() {

    return (
      <div className={styles.Authentication}>
        <form onSubmit={this.handleSubmit}>
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
          <Button color={'green'} isDisabled={!this.state.formIsValid}>Sign-up</Button>
          <div>
            <p>If you already have an account, switch to <span className={styles.signIn}> sign-in here!</span></p>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    authenticate: (email: string, pass: string) => dispatch(auth(email, pass)),
  }
}

export default connect(null, mapDispatchToProps)(Authentication);