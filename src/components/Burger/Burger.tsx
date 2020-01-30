import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.scss';

export type IngredientType = {
  salad: number;
  cheese: number;
  bacon: number;
  meat: number;
  [index: string] : number;
}

export interface BurgerProps {
  ingredients: IngredientType
}

const Burger: React.FC<BurgerProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {

  const ingreds = Object.keys(props.ingredients).flatMap(key => {
    return Array.from({ length: props.ingredients[key] }, () => key);
  })

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type='bread-top' />
      {ingreds.length === 0 ? <p className={styles.p}>Please add ingredients</p> :
        ingreds.map((ingr, index) => <BurgerIngredient type={ingr} key={index} />)
      }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
}

export default Burger;
