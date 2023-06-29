import { Request, Response } from "express";
import { UserService, userService } from "../services/UserService";
import { IUser } from "../models/IUser";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public getAllUsers = async (request: Request, response: Response) => {
        const users: IUser[] = await this.userService.getAll();
        response.json({ status: 200, isSuccess: true, users });
    };

    public registerUser = async (request: Request, response: Response) => {
        await this.userService.register(request.body);
        response.json({ status: 201, isSuccess: true });
    };

    public login = async (request: Request, response: Response) => {
        const token: string = await this.userService.login(
            request.body.email,
            request.body.password
        );

        response.json({ status: 200, isSuccess: true, token });
    };
}

export const userController = new UserController(userService);
