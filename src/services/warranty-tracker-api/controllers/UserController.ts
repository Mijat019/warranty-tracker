import { Request, Response } from "express";
import { UserService, userService } from "../services/UserService";
import { IUser } from "../models/IUser";
import { UserResponse } from "../responses/UserResponse";

export class UserController {
    constructor(private readonly userService: UserService) {}

    public getAllUsers = async (request: Request, response: Response) => {
        const users: IUser[] = await this.userService.getAll();

        const usersResponse: UserResponse[] = users.map((user: IUser) => ({
            id: user.id,
            email: user.email,
            labels: user.labels,
        }));

        response
            .status(200)
            .json({ status: 200, isSuccess: true, users: usersResponse });
    };
}

export const userController = new UserController(userService);
