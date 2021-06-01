import IUser from "./IUser";
import IUserBook from "./IUserBook";
import IGenreBook from "./IGenreBook";

export default interface IBook{
    idBook?: number;
    titleBook: string;
    language: string;
    imageBook: string;
    summaryBook: string;
    firstChapter: string; //Optionnal because big data so some request don't need to send this data
    audienceTag?: Record<string, number>;
    links: Record<string, string>;
    id_author?:number;
}

export interface IBookWithProgress extends IBook{
    progress: number;
}

export const mockBook: IBook = {
    idBook: 10,
    titleBook: "FakeBook", 
    language: "test francais",
    imageBook: "https://historythings.com/wp-content/uploads/2016/09/First-edition-of-Harry-Potter-books3-676x1024.jpg",
    summaryBook: " test summary",
    firstChapter: "test test", 
    audienceTag: {"Angst": 70, "Crime": 77, "Drama": 88, "Humor": 86, "Quest": 133, "Family": 60, "Horror": 27, "Parody": 39, "Poetry": 65, "Sci-fiv": 15, "Fantasy": 20, "Mystery": 45, "Romance": 263, "Tragedy": 13, "Western": 55, "Survival": 84, "Suspense": 67, "Adventure": 30, "Spiritual": 27, "Friendship": 69, "Hurt/Comfort": 92, "Supernatural": 49, "Homosexuality": 107},
    links: {"testAmazon": "https://www.testamazon.fr/Outlaws-Lena-Shartiaud/dp/2375210794"},
    id_author: 2    
}