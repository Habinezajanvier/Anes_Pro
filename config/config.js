require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
  db: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    name: process.env.DB_NAME_DEV,
  },
};
const testing = {
  db: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    port: process.env.DB_PORT_DEV,
    name: process.env.DB_NAME_DEV,
  },
};
const staging = {
  db: {
    database_url: process.env.DATABASE_URL,
  },
};
const production = {
  db: {
    database_url: process.env.DATABASE_URL,
  },
};

const config = {
  development,
  testing,
  staging,
  production,
};

module.exports = config[env];
