import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt'

import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { JWT_SECRET } from "@app/config";
import { UserResponse } from "./types/user.interface";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async createUser(userDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOneBy({ email: userDto.email });
        const userByUsername = await this.userRepository.findOne({
            where: { username: userDto.username }
        })

        if(userByEmail || userByUsername) {
            throw new HttpException({errors: ['Email or username are taken']}, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity();
        Object.assign(newUser, userDto)
        return this.userRepository.save(newUser);
    }

    async login(loginDto: LoginDto): Promise<UserEntity> {
        // const password = await hash(loginDto.password, 10);
        const user = await this.userRepository.findOne({
            where: {
                email: loginDto.email,
            }, select: ['id', 'username', 'email', 'bio', 'image', 'password']
        });
        if (user) {
            const match = await compare(loginDto.password, user.password)
            if(match) {
                delete user.password;
                return user;
            }
        }
        throw new HttpException({ errors: ['Password or username are invalid'] }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    async findById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({where: {id}})
    }

    update(updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
        const newData = {...user, ...updateUserDto}
        return this.userRepository.save(newData)
    }

    buildUserResponse(user: UserEntity): UserResponse {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }

    private generateJwt(user) {
        return sign({
            id: user.id,
            username: user.name,
            email: user.email
        }, JWT_SECRET)
    }
}