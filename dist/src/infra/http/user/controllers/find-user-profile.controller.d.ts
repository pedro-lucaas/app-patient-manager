import { FindUserProfile } from "@application/use-cases/users/find-user-profile";
import { UserViewModel } from "../view-models/user-view-model";
export declare class FindUserProfileController {
    private findUserProfile;
    constructor(findUserProfile: FindUserProfile);
    handle(req: any): Promise<UserViewModel>;
}
