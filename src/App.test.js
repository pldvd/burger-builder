import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store/store';

test('renders learn react link', () => {
  const { getAllByText } = render(<Provider store={store}><App /></Provider>);
  const helloArray = getAllByText(/hello/i); //array of items containing the text "hello"
  expect(helloArray).toHaveLength(2);
});
