import { changeAdapter } from '@/adapters/change-adapter';
import { config } from '@/config';
import { Change } from '@/models/Change';
import axios from 'axios';

const paginate = async ({
  employee_id,
  page = 1,
  limit = 10,
}: {
  employee_id: string;
  page?: number;
  limit?: number;
}): Promise<Change[]> => {
  const response = await axios.get(`${config.api.store}/employees/${employee_id}/changes_avaiables`, {
    params: { limit, page },
  });

  if (response?.data?.data?.data) return response.data.data.data.map((item: any) => changeAdapter(item));
  throw new Error('');
};

export const changesAvaiables = {
  paginate,
};
