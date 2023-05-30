import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponse } from "./types/user.interface";
import { LoginDto } from "./dto/login.dto";

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
}