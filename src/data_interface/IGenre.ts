import IGenreBook from "./IGenreBook";

export default interface IGenre{
    idGenre?: number;
    nameGenre: String;
}

export interface IGenreWithScore extends IGenre{
    score: number;
}