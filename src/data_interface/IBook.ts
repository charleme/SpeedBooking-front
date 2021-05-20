import IUser from "./IUser";
import IUserBook from "./IUserBook";
import IGenreBook from "./IGenreBook";

export default interface IBook{
    idBook?: number;
    titleBook: String;
    language: String;
    imageBook: String;
    summaryBook: String;
    firstChapter?: String; //Optionnal because big data so some request don't need to send this data
    audienceTag: String;
    links: String;
    author?: IUser;
    readers?: IUserBook[];
    bookGenres?: IGenreBook[];
}