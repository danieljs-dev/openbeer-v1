import userApi from '../services/api.user';
import yupSchemas from './yupSchemas';
import redirectUser from './redirectUser';

const handleSubmit = async ({ action, login, setToken, history }) => {
  const valid = await yupSchemas.login.isValid(login);
  if (valid) {
    const newUser = await userApi(action, login);
    redirectUser(newUser, history, setToken);
  }
};

export default handleSubmit;
