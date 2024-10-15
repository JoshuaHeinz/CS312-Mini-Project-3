//imports the PG node to connect
const { Pool } = require('pg');

//Creates a new connection to the PG node
const pool = new Pool(
    {
  //my PG username
  user: 'CatchUp',  
  //host
  host: '',  
  //database name
  database: 'MiniProject3DB',  
  //password
  password: '', 
  //default port for PG 
  port: 5432, 
    }
);

