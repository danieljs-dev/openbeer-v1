const frisby = require('frisby');
const connection = require('../src/models/connection');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../src/security');
const url = 'http://localhost:3001';

const adminUser = {
  email: 'tryber@trybe.com.br',
  password: '123456',
  userId: 1,
};

describe('Tests the profile endpoint', () => {
  beforeEach(() => {
    frisby.globalSetup({
      request: {
        headers: {
          'Authorization': generateToken(adminUser.userId),
          'Content-Type': 'application/json',
        }
      }
    });
    connection.end();
  });

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

  it('Should not be able to update without an name', async () => {
    await frisby
      .put(`${url}/user/edit`,
        {
          name: ''
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Name field is required.')
      })
      .catch((error) => { error })
  });

  it('Should not be able to update without an name in valid format', async () => {
    await frisby
      .put(`${url}/user/edit`,
        {
          name: 'Adalberto'
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Name must be at least 12 characters in a valid format. Example: Gabi Dal Silv')
      })
      .catch((error) => { error })
  });

  it('Should be able to update name successfully', async () => {
    await frisby
      .put(`${url}/user/edit`,
        {
          name: 'Erisberto Da Silva',
        })
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Name updated successfully.')
      })
      .catch((error) => { error })
  });
});
