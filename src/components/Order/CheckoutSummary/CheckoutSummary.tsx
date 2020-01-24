import React from 'react';
import Burger,{BurgerProps} from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

interface CheckoutSummaryProps extends BurgerProps{
  continue: () => void,
  cancel: () => void,
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = (props) => {
  return (
    <div>
      <Burger ingredients={props.ingredients}/>
      <Button color="green" clicked={props.continue}>Continue</Button>
      <Button color="red" clicked={props.cancel}>Cancel</Button>
    </div>
  )
}

export default CheckoutSummary;