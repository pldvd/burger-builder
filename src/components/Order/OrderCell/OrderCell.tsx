import React, { ReactElement } from 'react';
import style from './OrderCell.module.scss';
import { OrdersInterface } from '../../../containers/Orders/types';

function OrderCell(props: OrdersInterface): ReactElement {
  const ingreds = Object.keys(props.ingredients).map(id => (
    <div className={style.ingred} id={id} key={id}>
      <span>{id}</span>
      <span>({props.ingredients[id]})</span>
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