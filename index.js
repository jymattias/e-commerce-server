import express from 'express';
import cors from 'cors';
import json from 'body-parser';
import urlencoded from 'body-parser';
import mysql from 'mysql';
import usuario from './usuario.js';
import bearerToken from 'express-bearer-token';


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'e-commerce'
});


connection.connect();

const port = process.env.PORT || 8080;

const app = express().use(cors()).use(json()).use(bearerToken()).use(usuario(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});