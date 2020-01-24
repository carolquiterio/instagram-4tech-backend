import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserService } from '../user/user.service';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService) {
    }

    async login(login: LoginViewModel) {
        const user = await this.userService.attemptLogin(login);

        if (!user) {
            throw new BadRequestException('Incorrect Credentials');
        } 
        return {
            access_token: this.jwtService.sign({ status : 'Authorized'}),
            userId: user._id,
        };
    }

    delete(user: UserViewModel){

        const uuser = this.userService.deleteOldUser(user);
    
        if (!user) {
            throw new BadRequestException('Incorrect Credentials');
        } 
        return {
            access_token: this.jwtService.sign({ status : 'Deleted!'}),
        };
    }

    put(user: UserViewModel, newUser: UserViewModel){

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
}
