import { UserRepository, userRepository } from "../repositories/UserRepository";
import { UserService, userService } from "./UserService";

export class LabelsService {
    constructor(private readonly userRepository: UserRepository, private readonly userService: UserService) { }

    public add = async (userId: string, labels: string[]): Promise<void> => {
        await this.userService.checkIfUserExists(userId);

        await this.userRepository.addLabels(userId, labels);
    }

    public remove = async (userId: string, labels: string[]): Promise<void> => {
        await this.userService.checkIfUserExists(userId);

        await this.userRepository.removeLabels(userId, labels);
    }
}

export const labelsService = new LabelsService(userRepository, userService);