import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import BurgerControl from './BurgerControl';

describe('BurgerControl', () => {

  afterEach(() => cleanup())

  it('renders without an error', () => {

    render(<BurgerControl amount={1} name="salad" />);
    const component = screen.getByTestId('BurgerControlComponent');
    expect(component).toBeInTheDocument();
  })

  test('decrement button is disabled, if amount prop is 0', () => {

    render(<BurgerControl amount={0} name="salad" />);
    const lessButton = screen.getByRole('button', {name: 'Less'});
    expect(lessButton).toHaveAttribute('disabled');
  })

  it('increments and decrements if buttons are pushed', () => {
    let currentCount = 1;

    const myMock = jest.fn((direction, ing = 'salad') => {
      switch (direction) {
        case ('less'):
          currentCount -= 1;
          break;
        case ('more'):
          currentCount += 1;
          break;
        default:
          return;
      }
    })

    const {rerender} = render(<BurgerControl changeAmount={myMock} amount={currentCount} name="salad" />);
    const lessButton = screen.getByRole('button', {name: /less/i});
    const moreButton = screen.getByRole('button', {name: /more/i});
    const ingredientAmount = screen.getByTestId('ingredientAmount');
    fireEvent.click(moreButton);
    fireEvent.click(moreButton);
    fireEvent.click(moreButton);
    rerender(<BurgerControl changeAmount={myMock} amount={currentCount} name="salad" />)
    expect(ingredientAmount.textContent).toBe('4');
    expect(lessButton).not.toHaveAttribute('disabled');
    fireEvent.click(lessButton);
    expect(myMock).toHaveBeenCalledTimes(4);
    rerender(<BurgerControl changeAmount={myMock} amount={currentCount} name="salad" />)
    expect(ingredientAmount.textContent).toBe('3');
  })
})
