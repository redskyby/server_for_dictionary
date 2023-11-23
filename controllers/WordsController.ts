import {Request , Response} from "express";

class WordsController {
	async create(req : Request , res :Response ){
		await console.log('i work!');
	}
}