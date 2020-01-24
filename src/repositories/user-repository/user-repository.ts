import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domain/schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserRepository {
    constructor( 
        @InjectModel('User') private readonly userCollection: Model<User>){

    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection
        .find()
        .lean();
    }

    async createUser(newUser: UserViewModel) {
        const user = this.userCollection(newUser);
        return await user.save();
        //this.db.push(newUser);
        //return 'User successfully added!';
    }

    deleteUser(oldUser: UserViewModel) {
        // const index = this.db.indexOf( oldUser );
        // this.db.splice(index, 1);
        // return 'User successfully deleteded!';
    }

    updateUser(oldUser: UserViewModel, newUser: UserViewModel){
        // const index = this.db.indexOf(oldUser);
        // this.db.splice(index, 1, newUser);
        // return 'User successfully updated!'
    }

    addListOfUser(lista: UserViewModel[]){
        // for(var i = 0; i < lista.length; i++)
        //     this.db.push(lista[i]);
        // return 'List successfully added!';
    }
}
