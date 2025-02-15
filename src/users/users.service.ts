import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findExistentOrInsert(email: string) {
        let user = await this.userRepository.findOne({ where: { email } });
        if (!user) 
            user = await this.userRepository.save({ email });
        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) 
            throw new NotFoundException('user not found')
        return user;
    }
}
