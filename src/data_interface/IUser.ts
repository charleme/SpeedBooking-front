import IBook from "./IBook";
import IUserBook from "./IUserBook";

export default interface IUser{
    idUser?: number;
    username: string;
    email: string;
    password: string;
    genres?: Record<string, number>;
    languages: string | null;
}