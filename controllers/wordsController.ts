import { Request, Response } from 'express';
import models from '../models/models';

class WordsController {
    async create(req: Request, res: Response) {
        try {
            const { word, translate1, translate2 } = req.body;

            if (!word || !translate1) {
                return res.status(403).json({ message: 'Запрос должен содержать слово и его перевод!' });
            }

            const lowercaseWord: string = word.toLowerCase();
            const lowercaseTranslate: string = translate1.toLowerCase();
            const lowercaseThirdParam: string = translate2 ? translate2.toLowerCase() : undefined;
            const checkWordInDictionary = await models.Words.findOne({ where: { word: lowercaseWord } });

            if (checkWordInDictionary) {
                return res.status(403).json({ message: 'Такое слово уже есть в словаре!' });
            }

            const wordInDictionary = await models.Words.create({ word: lowercaseWord });
            const translationInDictionary = await models.Translations.create(
                translate2
                    ? {
                          translation1: lowercaseTranslate,
                          translation2: lowercaseThirdParam,
                          wordId: wordInDictionary.wordId,
                      }
                    : { translation1: lowercaseTranslate, wordId: wordInDictionary.wordId },
            );

            return res.status(200).json({ wordInDictionary, translationInDictionary });
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { count } = req.query;
            const countN: number = Number(count);
            const words = await models.Words.findAll({
                limit: countN,
                include: [
                    {
                        model: models.Translations,
                        attributes: ['translation1', 'translation2', 'translationId'],
                    },
                ],
            });
            res.json({ words });
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export default new WordsController();
