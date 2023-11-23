import { Request, Response } from 'express';

class WordsController {
    async create(req: Request, res: Response) {
        return res.json('i work!');
    }
}

export default new WordsController();
