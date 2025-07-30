import { employeeAdapter } from '@/adapters/employee-adapter';
import { config } from '@/config';
import { Employee } from '@/models/Employee';
import axios from 'axios';

const login = async ({ username, password }: { username: string; password: string }): Promise<string> => {
  const response = await axios.post(`${config.api.store}/auth/login`, {
    username,
    password,
  });

  if (response?.data?.data?.access_token) return response?.data?.data?.access_token;
  throw new Error('');
};

const validate = async ({ access_token }: { access_token: string }): Promise<Employee> => {
  const response = await axios.post(`${config.api.store}/auth/validate`, {
    access_token,
  });

  if (response?.data?.data) return employeeAdapter(response?.data?.data);
  throw new Error('');
};

export const auth = {
  login,
  validate,
};
