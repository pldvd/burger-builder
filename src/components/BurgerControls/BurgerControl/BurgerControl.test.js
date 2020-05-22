import React from 'react';
import {render} from '@testing-library/react';
import BurgerControl from './BurgerControl';

describe('BurgerControl', () => {

  const controlProps = {
    name: 'salad',
    amount: 1,
    changeAmount: jest.fn()
  }

  it('renders without an error', () => {
    const {getByTestId} = render(<BurgerControl props={controlProps}/>);
    const component = getByTestId('BurgerControlComponent');
    expect(component).toBeInTheDocument();
  })
})
