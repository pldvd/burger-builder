import React from 'react';
import Burger, { BurgerProps } from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.scss';
import { connect } from 'react-redux';
// import { BurgerState } from '../../../store/types';
import { cancel } from '../../../store/actions/index';

interface CheckoutSummaryProps extends BurgerProps {
  continue: () => void,
  cancel: () => void,
}



const CheckoutSummary: React.FC<CheckoutSummaryProps> = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1 style={{ textAlign: "center" }}>We hope you will like your burger!</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div className={styles.CenterButtons}>
        <Button color="green" clicked={props.continue}>Continue</Button>
        <Button color="red" clicked={props.cancel}>Cancel</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ingredients: state.burger.ingredients
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    cancel: () => dispatch(cancel)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSummary);