import { employeeAdapter } from '@/adapters/employee-adapter';
import { config } from '@/config';
import { Employee } from '@/models/Employee';
import axios from 'axios';

const find = async ({ id }: { id: string }): Promise<Employee> => {
  const response = await axios.get(`${config.api.store}/employees/${id}`);

  if (response?.data?.data) return employeeAdapter(response.data.data);
  throw new Error('');
};

export const employees = {
  find,
};
