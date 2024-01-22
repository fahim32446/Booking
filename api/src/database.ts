import fs from 'fs';
import knex from 'knex';
import config from './utils/config';

// const serverCa = [fs.readFileSync('./DigiCertGlobalRootCA.crt.pem', 'utf8')];

// export const db_name = 'booking';

// const createDbConn = () => {
//   const conn = knex({
//     client: 'mysql2',
//     connection: {
//       database: db_name,
//       port: 3306,
//       host: '127.0.0.1',
//       user: 'root',
//       password: '12345678',
//     },
//     pool: { min: 0, max: 7 },
//   });

//   console.log('connected to database...');

//   return conn;
// };

// export const db = createDbConn();

export const db_name = 'lrmobile_booking';

const createDbConn = () => {
  const conn = knex({
    client: 'mysql2',
    connection: {
      database: db_name,
      port: 3306,
      host: '127.0.0.1',
      user: 'lrmobile_azmir',
      password: 'lrmobile_azmir',
    },
    pool: { min: 0, max: 7 },
  });

  console.log('connected to database...');

  return conn;
};

export const db = createDbConn();
