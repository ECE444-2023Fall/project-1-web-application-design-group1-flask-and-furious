import LoginForm from '@/components/LoginForm';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Ethan Zheng Unit Test Function

describe('LoginForm', () => {
  it('Renders Login Inputs and Button', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const loginButton = screen.getByTestId('loginButton');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
