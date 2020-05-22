
import React from 'react';
import ReactDOM from 'react-dom';
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
    useSelector.mockImplementation(() => {
      return {
        auth: {
          token: null
        }
      };
    });
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('should render without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(<Router><Navigation /></Router>, root);
  })

  it('should not contain log-out if user is not authenticated', () => {
    const { queryByText } = render(<Router><Navigation /></Router>);
    const logoutText = queryByText(/log-out/i)
    expect(logoutText).toBeInTheDocument();
  })

  it('should contain log-out if user is authenticated', () => {
    const autheticatedState = {
      auth: {
        token: "adsfmasdökfksaöfdlmadsflösakdfö"
      }
    }

    // useSelector.mockImplementation(callback => callback(autheticatedState))
    useSelector.mockReturnValue(autheticatedState);
    const { getAllByText } = render(<Router><Navigation /></Router>);
    const logoutTextArr = getAllByText(/log-out/i)
    expect(logoutTextArr).toHaveLength(1);
  })
})