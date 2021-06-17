const frisby = require('frisby');
const connection = require('../src/models/connection');
const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../src/security');
const url = 'http://localhost:3001';

const adminUser = {
  email: 'tryber@trybe.com.br',
  password: '123456',
  userId: 1,
  isVendor: true
};

describe('Testing sales endpoint', () => {
  beforeAll(() => {
    frisby.globalSetup({
      request: {
        headers: {
          'Authorization': generateToken(adminUser.userId, adminUser.isVendor),
          'Content-Type': 'application/json',
        }
      }
    });
    connection.end();
  });

  it('Should not be able to create a sale without productId', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { quantity: 2 },
          ],
          delivery: {
            address: "Rua das Pamonhas",
            number: "315"
          },
          salePrice: 15.00
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid products id or quantity');
      });
  });

  it('Should not be able to create a sale without quantity', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { productId: 2 },
          ],
          delivery: {
            address: "Rua das Pamonhas",
            number: "315"
          },
          salePrice: 15.00
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid products id or quantity');
      });
  });

  it('Should not be able to create a sale without address', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { productId: 2, quantity: 2 },
            { productId: 3, quantity: 5 }
          ],
          delivery: {
            number: "315"
          },
          salePrice: 15.00
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid delivery adress or number');
      });
  });

  it('Should not be able to create a sale without number', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { productId: 2, quantity: 2 },
            { productId: 3, quantity: 5 }
          ],
          delivery: {
            address: "Rua das Pamonhas"
          },
          salePrice: 15.00
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid delivery adress or number');
      });
  });

  it('Should not be able to create a sale with price inconsistency', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { productId: 2, quantity: 2 },
            { productId: 3, quantity: 5 }
          ],
          delivery: {
            address: "Rua das Pamonhas",
            number: "315"
          },
          salePrice: 27.00
        })
      .expect('status', StatusCodes.BAD_REQUEST)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('price inconsistency');
      });
  });

  it('Should be able to create a sale', async () => {
    await frisby
        .post(`${url}/sales/create`, {
          sale: [
            { productId: 2, quantity: 2 },
            { productId: 3, quantity: 5 }
          ],
          delivery: {
            address: "Rua das Pamonhas",
            number: "315"
          },
          salePrice: 27.45
        })
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Sale successfully created');
      });
  });

  it('Should be able to get a sale by userId', async () => {
    await frisby
      .get(`${url}/sales/1`)
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const arrayResult = [{...result}];
        expect(arrayResult.length).toBeGreaterThanOrEqual(1);
      });
  });
});
