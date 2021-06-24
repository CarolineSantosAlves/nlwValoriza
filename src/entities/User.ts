import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users") //dentro do parenteses nome da tabela que está sendo referenciada 
 class User {
    @PrimaryColumn()
     readonly id: string;

     @Column()
     name: string;

     @Column()
     email: string;

     @Column()
     admin: boolean;

     @Column()
     password: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

     constructor(){
         if(!this.id){ // se não estiver vindo id, significa que é novo usuário, então cria um novo id
             this.id = uuid();
         }
     }

 }

 export { User };

 //Entidade < - > ORM < - > BD (users)
