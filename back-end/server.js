const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./src/openAPI/swaggerOptions');
require('dotenv/config');

const routes = require('./src/main.routes');

const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use("/doc", swaggerUI.serve, swaggerUI.setup(specs));

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => console.log(`On na port ${PORT}`));
