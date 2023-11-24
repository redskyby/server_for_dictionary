import { Request, Response } from 'express';
import models from '../models/models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const generateJwt = (userId: number, email: string, role: string): string => {
    return jwt.sign({ userId, email, role }, process.env.SECRET_KEY!, {
        expiresIn: '1h',
    });
};

class UserController {
    async registration(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(404).json({ message: 'Некорректный email или password!' });
            }
            const candidate = await models.User.findOne({ where: { email } });

            if (candidate) {
                return res.status(404).json({ message: 'Пользователь с таким email существует!' });
            }

            const hashPassword: string = await bcrypt.hash(password, 5);
            const user = await models.User.create({ email, role, password: hashPassword });
            const token: string = generateJwt(user.userId, user.dataValues.email, user.dataValues.role);
            return res.status(200).json({ token });
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            return res.status(500).json({ message: 'Пользователь с таким email не существует!' });
        }

        const comparePassword: boolean = bcrypt.compareSync(String(password), String(user.dataValues.password));

        if (!comparePassword) {
            return res.status(500).json({ message: 'Указан неверный пароль' });
        }

        const token: string = generateJwt(user.userId, user.dataValues.email, user.dataValues.role);
        return res.status(200).json({ token });
    }
}

export default new UserController();
