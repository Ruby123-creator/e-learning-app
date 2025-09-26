// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Topicwise Institute API Documentation',
      version: '1.0.0',
      description: 'A brief description of your API',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        // description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;
