import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor (private authService: AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password',
        })
    }

    async validate(email: string, password: string){
        const client = await this.authService.validateClient(email, password)

        if(!client) throw new UnauthorizedException('Invalid credentials.')
        return client
    }
}