export default interface IGenre{
    idGenre?: number;
    nameGenre: string;
}

export interface IGenreWithScore extends IGenre{
    score: number;
}