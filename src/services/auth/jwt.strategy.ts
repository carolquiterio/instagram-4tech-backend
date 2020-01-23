import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

/*
A SECRET NUNCA DEVE SER EXPOSTA PUBLICAMENTE
A chave secreta só esta a mostra n fins de deixar claro o que o codigo esta fazendo.
Em um ambiente de produção, a achave deve estar protegida por medidas apropriadas (como
por exemplo secret vaults, váriaveris de ambiente ou serviços de configuração)4
*/
export const secretKey = 'heyoh';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,        
        })
    }

    async validate(payload: any) {
        return{ userLogin: payload.userLogin };
    }
}