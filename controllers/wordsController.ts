import { Request, Response } from "express";
import models from "../models/models";

class WordsController {
    async create(req: Request, res: Response) {
        try {
            const { word, translate1, translate2 } = req.body;

            if (!word || !translate1) {
                return res.status(403).json({ message: "Запрос должен содержать слово и его перевод!" });
            }

            const lowercaseWord: string = word.toLowerCase();
            const lowercaseTranslate: string = translate1.toLowerCase();
            const lowercaseThirdParam: string = translate2 ? translate2.toLowerCase() : undefined;
            const checkWordInDictionary = await models.Words.findOne({ where: { word: lowercaseWord } });

            if (checkWordInDictionary) {
                return res.status(403).json({ message: "Такое слово уже есть в словаре!" });
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
            const { count, offset } = req.query;
            const countN: number = Number(count);
            const offsetN: number | undefined = offset ? Number(offset) : undefined;
            const words = await models.Words.findAll({
                limit: countN,
                offset: offsetN,
            });
            const translations = await models.Translations.findAll({
                limit: countN,
            });
            const totalCount = await models.Words.count();

            res.json({ words, translations, totalCount });
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async put(req: Request, res: Response) {
        try {
            const { id, newWord, newTranslate1, newTranslate2 = null } = req.query;

            const word = await models.Words.findOne({
                where: { wordId: id },
            });
            const translate = await models.Translations.findOne({
                where: { translationId: id },
            });

            if (!word || !translate) {
                return res.status(500).json({ message: "Нет такого слова." });
            }

            const newWordInDataBase = await models.Words.update(
                {
                    word: newWord,
                },
                {
                    where: { wordId: id },
                },
            );

            const newTranslateInDataBase = await models.Translations.update(
                {
                    translation1: newTranslate1,
                    translation2: newTranslate2,
                },
                {
                    where: { translationId: id },
                },
            );

            return res.json({ newWordInDataBase, newTranslateInDataBase });
        } catch (e) {
            res.status(403).json(e);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const word = await models.Words.findOne({
                where: { wordId: id },
            });
            if (!word) {
                return res.status(500).json({ message: "Нет такого слова." });
            }

            const deleteWord = await models.Words.destroy({
                where: { wordId: id },
            });

            return res.json({ deleteWord });
        } catch (e) {
            res.status(403).json(e);
        }
    }
}

export default new WordsController();
