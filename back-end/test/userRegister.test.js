const frisby = require('frisby');
const connection = require('../src/models/connection');
const { StatusCodes } = require('http-status-codes');
const url = 'http://localhost:3001';

describe('Test the register endpoint', () => {
  afterAll(async () => {
    await connection.execute(
      'DELETE FROM Trybeer.users;',
    );
    await connection.execute(
      `INSERT INTO Trybeer.users (id, name, email, password, role)
        VALUES
          ('1', 'Tryber Admin', 'tryber@trybe.com.br', '123456', 'administrator'),
          ('2', 'testuser', 'user@test.com', 'test123', 'client');`
    );
    await connection.end();
  });

  it('Should not be able to sign in without an name', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Name field is required.');
      })
      .catch((error) => { error })
  });

  it('Should not be able to sign in without an email', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
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

  it('Should not be able to sign in with an invalid email', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email must be at a valid format. Example: your@email.com');
      })
      .catch((error) => { error })
  });

  it('Should not be able to sign in without an password', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Password field is required.');
      })
      .catch((error) => { error })
  });

  it('Should be able to sign in successfully', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.CREATED)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.email).toBe('gabi.dalsilv@gmail.com');
      })
      .catch((error) => { error })
    });

  it('Should not be able to sign in with an email already registered', async () => {
    // expect.assertions(3);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
        });

    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('This email is already in use.');
      })
      .catch((error) => { error })
  });

  it('Should be client when sign in successfully', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
          isVendor: false,
        })
      .expect('status', StatusCodes.CREATED)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.role).toBe('client');
      })
      .catch((error) => { error })
  });

  it('Should be administrator when sign in successfully', async () => {
    // expect.assertions(2);
    await frisby
      .post(`${url}/user/register`,
        {
          name: 'Gabi Dal Silv',
          email: 'gabi.dalsilv@gmail.com',
          password: 'test123',
          isVendor: true,
        })
      .expect('status', StatusCodes.CREATED)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.role).toBe('administrator');
      })
      .catch((error) => { error })
  });
});