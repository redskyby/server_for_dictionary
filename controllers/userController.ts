import { Request, Response } from 'express';

class UserController {
    async create(req: Request, res: Response) {
        return res.json("'i work! i'm userController");
    }
}

export default new UserController();
