import { Request, Response } from "express";
import { UserService, userService } from "../services/UserService";

export class AuthController {
    constructor(private readonly userService: UserService) {}

    public registerUser = async (req: Request, res: Response) => {
        await this.userService.register(req.body);
        res.status(201).json({ status: 201, isSuccess: true });
    };

    public login = async (req: Request, res: Response) => {
        const token: string = await this.userService.login(
            req.body.email,
            req.body.password
        );

        res.status(200).json({ status: 200, isSuccess: true, token });
    };
}

export const authController = new AuthController(userService);
