import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const burger = (props) => {

  const ingreds = Object.keys(props.ingredients).flatMap(key => {
    return Array.from({ length: props.ingredients[key] }, () => key);
  })

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top' />
      { ingreds.length === 0 ? <p>Please add ingredients</p> :
        ingreds.map((ingr, index) => <BurgerIngredient type={ingr} key={index} />)
      }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default burger;
