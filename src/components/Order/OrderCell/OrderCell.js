import React from 'react';
import style from './OrderCell.module.scss';

const OrderCell = (props) => {
  const ingreds = Object.keys(props.ingredients).map(key => (
    <div className={style.ingred} key={key}>
      <span>{key}</span>
      <span>({props.ingredients[key]})</span>
    </div>
  ))

  return (
    <div className={style.OrderCell}>
      <h4>Ingredients:</h4>
      <div className={style.ingredsList}>
        {ingreds}
      </div>
      <p><span className={style.price}>Price: </span><span>USD {props.price}</span></p>
    </div>
  )
}

export default OrderCell;