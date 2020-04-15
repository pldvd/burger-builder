
import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn()
  }
})

describe("NavComponent", () => {
  beforeEach(() => {
    useSelector.mockImplementation((callback) => {
      return callback({
        auth: {
          token: null
        }
      });
    });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('should not contain log-out if user is not authenticated', () => {
    const { queryByText } = render(<Router><Navigation /></Router>);
    const logoutText = queryByText(/log-out/i)
    expect(logoutText).toBe(null);
  })

  it('should contain log-out if user is authenticated', () => {
    const autheticatedState = {
      auth: {
        token: "adsfmasdökfksaöfdlmadsflösakdfö"
      }
    }

    useSelector.mockImplementation(callback => callback(autheticatedState))
    const { getAllByText } = render(<Router><Navigation /></Router>);
    const logoutTextArr = getAllByText(/log-out/i)
    expect(logoutTextArr).toHaveLength(1);
  })
})