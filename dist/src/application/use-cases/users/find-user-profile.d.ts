import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
export declare class FindUserProfileRequest {
    userId: string;
}
export declare class FindUserProfileResponse {
    user: User;
}
export declare class FindUserProfile {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: FindUserProfileRequest): Promise<FindUserProfileResponse>;
}
