import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponse } from "./types/user.interface";
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";
import { ExpressRequest } from "./types/expressRequest.interface";
import { UserEntity } from "./user.entity";
import { User } from "./decorators/user.decorator";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('users')
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponse> {
        const newUser = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(newUser)
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginDto: LoginDto): Promise<UserResponse> {
        const user = await this.userService.login(loginDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    getCurrentUser(@User() user: UserEntity): UserResponse {
        return this.userService.buildUserResponse(user)
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateUser(@Body('user') updatedUserDto: UpdateUserDto, @User() user: UserEntity): Promise<UserResponse> {
        const newUser = await this.userService.update(updatedUserDto, user)
        return this.userService.buildUserResponse(newUser)
    }

    // @Get('user')
    // getCurrentUser(@Req() request: ExpressRequest): UserResponse {
    //     return this.userService.buildUserResponse(request.user)
    // }
}