import { Client } from 'pg';

require('dotenv').config();

const database = process.env.DATABASE_URL;

const connectString = database;

const clientString = new Client(connectString);

clientString.connect();

const createTable = () => {
  const query = `
                
          CREATE TABLE IF NOT EXISTS users (
   
              id SERIAL,

              userid VARCHAR (255) PRIMARY KEY,
   
              firstname VARCHAR (255) NOT NULL,

              lastname VARCHAR (255) NOT NULL,
                    
              password VARCHAR (255) NOT NULL,

              phone VARCHAR (255) NOT NULL,
   
              role VARCHAR (255) NOT NULL,

              createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   
          );

      `;

  clientString.query(query, (err) => {
    if (err) {
      return err.message;
    }
    clientString.end();

  });
};


createTable();
