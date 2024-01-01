import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

// const sequelize: Sequelize = new Sequelize(process.env.DATABASE!, process.env.USER!, process.env.PASSWORD!, {
//     dialect: "mysql",
//     host: process.env.HOST!,
//     port: parseInt(process.env.PORT_DB!, 10),
// });

const sequelize: Sequelize = new Sequelize(process.env.DATABASE!, "root", "Docenko4493!", {
    dialect: "mysql",
    host: process.env.HOST!,
    port: parseInt(process.env.PORT_DB!, 10),
});


export default sequelize;
