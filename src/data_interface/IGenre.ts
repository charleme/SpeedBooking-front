import IGenreBook from "./IGenreBook";

export default interface IGenre{
    idGenre?: number;
    booksAssociated?: IGenreBook[];
    nameGenre: String;
}