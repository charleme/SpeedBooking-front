import IBook from "./IBook";
import IUserBook from "./IUserBook";

export default interface IUser{
    id_user?: number;
    username: string;
    email: string;
    password: string;
    genres?: string;
    languages: string;
    books?: IBook[];
    booksRead?: IUserBook[];
}