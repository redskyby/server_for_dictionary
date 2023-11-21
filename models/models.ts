import sequelize from "../db_sequelize";
import {Model , DataTypes} from "sequelize";

class User extends Model {
    public userId!: number;
    public email!: string;
    public password!: number;
    public pole!: string;
}

class Words extends Model{
    public wordId!:number;
    public word!: string;
}

class Translations extends Model{
    public translationId!:number;
    public translation! : string;
}

