import { Request, Response } from "express";
import { UserService, userService } from "../services/UserService";
import { IUser } from "../models/IUser";

export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getAllUsers = async (request: Request, response: Response) => {
        const users: IUser[] = await this.userService.getAll()
        response.json({ status: 200, success: true, users })
    }

    public registerUser = async (request: Request, response: Response) => {
        await this.userService.register(request.body)
        response.json({ status: 201, success: true })
    }
}

export const userController = new UserController(userService);