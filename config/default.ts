module.exports = {
  app: {
    port: 3000,
  },
  jwt: {
    salt: 10,
    secret: 'default-secret',
  },
  database: {
    connection: {
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 5432,
      username: 'root',
      password: '1234',
      database: 'my-storage',
    },
    config: {
      synchronize: true,
      logging: true,
      entities: ['./src/**/*.entity.ts', './dist/**/*.entity.ts'],
    },
  },
};
