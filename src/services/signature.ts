import axios from 'axios';

const verify = async ({ employee_id }: { employee_id:string }): Promise<boolean> => {
   const response = await axios.post(`http://localhost:3005/Service1.svc/verificarHuella`, {
   empleado: employee_id
  });

  return response.data.verificarHuellaResult === 'verificada';
};



export const signature = {
  verify
}