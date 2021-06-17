const frisby = require('frisby');
const { StatusCodes } = require('http-status-codes');
const url = 'http://localhost:3001';

describe('Tests the login endpoint', () => {
  it('Should not be able to sign in without an email', async () => {
    await frisby
      .post(`${url}/login`,
        {
          password: 'test123',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email field is required.');
      })
      .catch((error) => { error })
  });

  it('Should not be able to sign in without an password', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'trybeer@gmail.com',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password field is required.');
      })
      .catch((error) => { error })
  });

  it('Should not be able to sign in with an invalid email', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'test@test.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.NOT_FOUND)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Login failed. User not found.');
      })
      .catch((error) => { error })
  });

  it('Should not be able to sign in with an invalid password', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'user@test.com',
          password: '123456',
        })
      .expect('status', StatusCodes.UNAUTHORIZED)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Login failed. Invalid credentials.');
      })
      .catch((error) => { error })
  });

  it('Should be able to login successfully', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'user@test.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.OK)
      .then((responseLogin) => {
        const { json } = responseLogin;
        expect(json.token).not.toBeNull();
      })
      .catch((error) => { error })
  });
});
