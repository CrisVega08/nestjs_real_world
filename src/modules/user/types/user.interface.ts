import { UserEntity } from "../user.entity";

export interface UserResponse {
    user: UserType & { token: string };
}

export type UserType = Omit<UserEntity, 'hashPassword'>;
