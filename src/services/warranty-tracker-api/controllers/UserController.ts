import { Request, Response } from "express";
import { UserService, userService } from "../services/UserService";

export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async registerUser(request: Request, response: Response): Promise<void> { 
        try {
            await this.userService.registerUser(request.body)
            response.json({ status: 201, success: true })
        } catch {
            response.json({ status: 500, success: true })
        }   
    }
}

export const userController = new UserController(userService);