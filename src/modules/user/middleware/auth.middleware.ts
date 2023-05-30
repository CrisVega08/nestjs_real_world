import { Injectable, NestMiddleware } from "@nestjs/common";
import { ExpressRequest } from "../types/expressRequest.interface";
import { NextFunction, Response } from "express";
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from "@app/config";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: ExpressRequest, _: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }
        const token = req.headers.authorization.split(' ')[1]
        try {
            const decode = verify(token, JWT_SECRET);
            req.user = await this.userService.findById(decode.id);
            next()
        } catch (error) {
            req.user = null // TODO error
        }
    }

}