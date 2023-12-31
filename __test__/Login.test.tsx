import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginPage from '@/app/login/page';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
jest.mock('react-hot-toast');
describe('LoginPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it('should render the login page', () => {
        render(<LoginPage />);

        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('password');
        const loginButton = screen.getByText('login');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('should display validation errors for empty fields', async () => {
        render(<LoginPage />);
        const loginButton = screen.getByText('login');

        await userEvent.click(loginButton);

        expect(await screen.findByText('Username is required.')).toBeInTheDocument();
        expect(await screen.findByText('Password is required.')).toBeInTheDocument();
    });

    it('should display validation error for short password', async () => {
        render(<LoginPage />);
        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('password');
        const loginButton = screen.getByText('login');
        const axiosMock = axios as jest.Mocked<typeof axios>;
        fireEvent.change(usernameInput, { target: { value: 'john' } });

        fireEvent.change(passwordInput, { target: { value: '123' } });


        await userEvent.click(loginButton);

        expect(axiosMock.post).not.toBeCalled();
        expect(await screen.findByText('Password must be at least 6 characters.')).toBeInTheDocument();
      });
      test('validates form and calls onLogin when submitted with valid inputs', async () => {
        render(<LoginPage />);
        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('password');
        const loginButton = screen.getByText('login');
        const toastMock = toast as jest.Mocked<typeof toast>;

        const axiosMock = axios as jest.Mocked<typeof axios>;
        axiosMock.post.mockResolvedValueOnce({ data: { success: true } });
        fireEvent.change(usernameInput, { target: { value: 'usernametest' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(loginButton);
        await waitFor(() => {
          expect(axiosMock.post).toHaveBeenCalledWith('/api/login', {
            username: 'usernametest',
            password: 'password123',
          });

        });
        expect(toastMock.success).toHaveBeenCalledWith('Login successful!');
        expect(toastMock.error).not.toHaveBeenCalled();
      });
      test('should display error toast when login failed', async () => {
        render(<LoginPage />);
        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('password');
        const loginButton = screen.getByText('login');
        const toastMock = toast as jest.Mocked<typeof toast>;

        const axiosMock = axios as jest.Mocked<typeof axios>;
        axiosMock.post.mockResolvedValueOnce({ data: { success: false } });
        fireEvent.change(usernameInput, { target: { value: 'usernametest' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(loginButton);
        await waitFor(() => {
          expect(axiosMock.post).toHaveBeenCalledWith('/api/login', {
            username: 'usernametest',
            password: 'password123',
          });

        });
        expect(toastMock.error).toHaveBeenCalledWith('Login failed!');
        expect(toastMock.success).not.toHaveBeenCalled();
      });
      test('should display error toast on login failure', async () => {
        render(<LoginPage />);
        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('password');
        const loginButton = screen.getByText('login');
        const toastMock = toast as jest.Mocked<typeof toast>;

        const axiosMock = axios as jest.Mocked<typeof axios>;
        axiosMock.post.mockRejectedValueOnce(new Error('Login failed'));
        fireEvent.change(usernameInput, { target: { value: 'usernametest' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        await userEvent.click(loginButton);
        await waitFor(() => {
          expect(axiosMock.post).toHaveBeenCalledWith('/api/login', {
            username: 'usernametest',
            password: 'password123',
          });

        });
        expect(toastMock.error).toHaveBeenCalledWith('Login failed!');
        expect(toastMock.success).not.toHaveBeenCalled();
      });
});