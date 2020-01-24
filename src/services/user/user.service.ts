import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository) {
    }

    getUsers() {
        return this.userRepository.getUsers();
    }

    async createNewUser(newUser: UserViewModel) {

        const userList = await this.userRepository.getUsers();

        const existingUser = userList.find(x => x.userName === newUser.userName);

        if (existingUser) {
            throw new BadRequestException('This username already exists!');
        }

        return this.userRepository.createUser(newUser);
    }

    async attemptLogin(login: LoginViewModel) {
        const userList = await this.userRepository.getUsers();

        const foundLogin = userList
            .find(x =>
                x.userLogin === login.userLogin &&
                x.password === login.password);

        return foundLogin;
    }

     deleteOldUser(oldUser: UserViewModel){
        /*const userList = await this.userRepository.getUsers();

        const existingUser = userList.find(x => x.userLogin === oldUser.userLogin);

        if (!existingUser) {
            throw new BadRequestException('This username does not exists!');
        }

        return this.userRepository.deleteUser(oldUser);*/
    }

    putOldUser(oldUser: UserViewModel, newUser: UserViewModel){
        /*const userList = await this.userRepository.getUsers();

        const existingUser = userList.find(x => x.userLogin === oldUser.userLogin);

        if(!existingUser){
            throw new BadRequestException('This login does not exist!');
        }

        return this.userRepository.updateUser(oldUser, newUser);*/
    }

    addUserList(list:UserViewModel[]){
       /* const userList = await this.userRepository.getUsers();

        let existingUser = null;

        for(var i = 0; i < list.length; i++)
        {
            existingUser = userList.find(x => x.userLogin === list[i].userLogin);
        }

        if(existingUser){
            throw new BadRequestException('Some of de users already exists!')
        }

        return this.userRepository.addListOfUser(list);*/
    }

}
