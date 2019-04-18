module.exports = {
  SERVER: {
    PORT: 3000,
  },
  DATABASE: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: 5432,
    username: 'root',
    password: '1234',
    database: 'my-storage',
    synchronize: true,
    logging: true,
    entities: ['./src/**/*.entity.ts', './dist/**/*.entity.ts'],
  },
};
