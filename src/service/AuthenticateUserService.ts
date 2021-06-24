import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){
        const userRepositories = getCustomRepository(UsersRepositories);

        //verificar se email existe
        const user = await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error('Email/Password incorrect')
        }

        //verificar se senha é válida

        //senha que usuário inseriu no sistema e compara com a senha com o hash
        const paswordMatch = await compare(password, user.password);

        if(!paswordMatch){
            throw new Error('Email/Password Incorrect')
        }

        //gerar token

        const token = sign({
            email: user.email
        },'18f43d5f2fecb71b3aab86dc96fa48b0', {
            subject: user.id,
            expiresIn: '1d'
        })

        return token;
    }
}

export { AuthenticateUserService }