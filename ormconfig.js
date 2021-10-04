require('dotenv/config')

const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'
const fileType = process.env.NODE_ENV === 'production' ? 'js' : 'ts'

const dbConfig = {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    entities: [
      `./${SOURCE_PATH}/modules/**/infra/typeorm/entities/*.${fileType}`
    ],
    migrations: [
      `./${SOURCE_PATH}/shared/infra/typeorm/migrations/*.${fileType}`
    ],
    cli: {
      migrationsDir: `./${SOURCE_PATH}/shared/infra/typeorm/migrations`,
    },
  };

module.exports = dbConfig;