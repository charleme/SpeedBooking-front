import IBook from "./IBook";
import IUser from "./IUser";

export default interface IUserBook{
    idGenreBook?: number;
    idUser: IUser;
    idBook: IBook;
    progress: number;
}