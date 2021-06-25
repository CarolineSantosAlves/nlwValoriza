import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IpalLoad{
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    //Receber Token

    const authToken = request.headers.authorization;
    //Validar se token está preenchido
    if(!authToken){
        return response.status(401).end();
    }

        
    //Validar se token é valido
    const [,token] = authToken.split(' ');
    try {
        const { sub } = verify(token, '18f43d5f2fecb71b3aab86dc96fa48b0') as IpalLoad;

        //Recuperar informações do Usuário
        request.user_id = sub;
        
        return next();
    } catch (error) {
        return response.status(401).end();
    }

    


}