const frisby = require('frisby');
const connection = require('../src/models/connection');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../src/security');
const url = 'http://localhost:3001';

const clientUser = {
  email: 'user@test.com',
  password: 'test123',
  userId: 2,
  isVendor: true
};

describe('Testing products endpoint', () => {
  beforeAll(() => {
    frisby.globalSetup({
      request: {
        headers: {
          'Authorization': generateToken(clientUser.userId, clientUser.isVendor),
          'Content-Type': 'application/json',
        }
      }
    });
    connection.end();
  });

  it('Should be able to get a list of all products', async () => {
    await frisby
        .get(`${url}/products`)
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const arrayResult = [
          'Skol Lata 250ml',
          'Heineken 600ml',
          'Antarctica Pilsen 300ml',
          'Brahma 600ml',
          'Skol 269ml',
          'Skol Beats Senses 313ml',
          'Becks 330ml',
          'Brahma Duplo Malte 350ml',
          'Becks 600ml',
          'Skol Beats Senses 269ml',
          'Stella Artois 275ml'
        ];
        const newArrayResult = result.map((elem) => elem.name);
        expect(JSON.stringify(arrayResult)).toBe(JSON.stringify(newArrayResult));
      });
  });
});
