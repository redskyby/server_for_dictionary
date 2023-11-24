import sequelize from '../db_sequelize';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
    public userId!: number;
    public email!: string;
    public password!: number;
    public pole!: string;
}

class Words extends Model {
    public wordId!: number;
    public word!: string;
}

class Translations extends Model {
    public translationId!: number;
    public translation1!: string;
    public translation2!: string;
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },
    },
    {
        sequelize,
        modelName: 'user',
    },
);

Words.init(
    {
        wordId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'words',
    },
);

Translations.init(
    {
        translationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        translation1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        translation2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'translations',
    },
);

User.belongsToMany(Words, { through: 'UserWords' });
Words.belongsToMany(User, { through: 'UserWords' });

Words.hasOne(Translations, { foreignKey: 'wordId', onDelete: 'CASCADE' });
Translations.belongsTo(Words, { foreignKey: 'wordId' });

export default { User, Words, Translations };
