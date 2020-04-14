
import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
// import { useSelector } from 'react-redux';

jest.mock('react-redux', () => {
 return {
   useSelector: jest.fn()
  }
})

describe("MySearchComponent", () => {
//   beforeEach(() => {
//     useSelector.mockImplementation((callback) => {
//       return callback(mockAppState);
//     });
//   });
//   afterEach(() => {
//     useSelector.mockClear();
//   });

  test('Navigation ul has two children if user is not logged in', () => {
    const {queryByText } = render(<Router><Navigation /></Router>);
    const logoutText = queryByText(/log-out/i)
    expect(logoutText).toBe(null);
  })
 })