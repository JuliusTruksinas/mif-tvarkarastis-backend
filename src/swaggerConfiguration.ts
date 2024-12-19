import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MIF tvarkarastis API',
      version: '1.0.0',
      description: 'API documentation of MIF tvarkarastis project',
    },
  },
  apis: ['./docs/*.docs.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
