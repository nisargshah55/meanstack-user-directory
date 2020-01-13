export class UserModel {
    _id: String;
    firstName: String;
    lastName: String;
    email: String;
    password: Array<string>;
    dob: Date;
    isAdmin: boolean;
 }