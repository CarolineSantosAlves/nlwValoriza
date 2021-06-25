import { Request, Response } from 'express';
import { ListTagsService } from '../service/ListTagsService';

class ListTagsConstroller{
    async handle(request: Request, response: Response){
        const listTagsService = new ListTagsService();

        const tags = await listTagsService.execute();

        return response.json(tags);
    }

}

export { ListTagsConstroller };