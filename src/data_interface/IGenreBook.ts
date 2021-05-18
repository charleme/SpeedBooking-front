import IBook from "./IBook";
import IGenre from "./IGenre";

export default interface IGenreBook{
    idGenreBook?: number;
    idBook: IBook;
    idGenre: IGenre;
    score: number;
}