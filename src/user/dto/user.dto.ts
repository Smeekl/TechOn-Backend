export class CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export class UpdateUserDto {}

export class FindUserDto {
  id: number;
}

export class UserDto {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  visits?: number;
}
