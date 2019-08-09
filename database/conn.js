import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const mydatabase = process.env.DATABASE_URL;

const connect = new Pool({ connectionString: mydatabase, ssl: true });


export default connect;
