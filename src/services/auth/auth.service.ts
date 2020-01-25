import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserService } from '../user/user.service';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user-repository/user-repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
        private jwtService: JwtService) {
    }

    async login(login: LoginViewModel) {
        const user = await this.userRepository.getByCredetials(login.userLogin, login.password);

        if (!user) {
            throw new BadRequestException('Incorrect Credentials');
        } 
        return {
            access_token: this.jwtService.sign({ status : 'Authorized'}),
            userId: user._id,
        };
    }

   /*
    async delete(user: UserViewModel){

        const uuser = this.userRepository.deleteOldUser(user);
    
        if (!user) {
            throw new BadRequestException('Incorrect Credentials');
        } 
        return {
            access_token: this.jwtService.sign({ status : 'Deleted!'}),
        };
    }

    async put(user: UserViewModel, newUser: UserViewModel){

        if(user.userLogin != newUser.userLogin || user.password != newUser.password)
            throw new Error('It is not posible to change de login or de password!');

        const uuser = this.userService.putOldUser(user, newUser);
    
        if (!user) {
            throw new BadRequestException('Incorrect Credentials');
        } 
        return {
            access_token: this.jwtService.sign({ status : 'Updated!'}),
        };
    }
    */
}
