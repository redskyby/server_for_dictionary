import express, { Express } from 'express';
import sequelize from './db_sequelize';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app: Express = express();
const port: number = parseInt(process.env.PORT!, 10) || 5000;

app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
