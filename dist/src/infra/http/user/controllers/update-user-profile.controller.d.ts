import { UpdateUserProfile } from "@application/use-cases/users/update-user-profile";
import { UpdateUserProfileBody } from "../dtos/update-user-profile-body";
export declare class UpdateUserProfileController {
    private updateUserProfile;
    constructor(updateUserProfile: UpdateUserProfile);
    handle(req: any, body: UpdateUserProfileBody): Promise<void>;
}
