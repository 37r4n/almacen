import { Employee } from '@/models/Employee';

export const employeeAdapter = (data: any): Employee => ({
  id: String(data.id),
  name: String(data.name),
  image_url: String(data.image_url),
});
