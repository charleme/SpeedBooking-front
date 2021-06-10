export default interface IUser{
    idUser?: number;
    username: string;
    email: string;
    password: string;
    genres?: Record<string, number>;
    languages: string;
}

export const mockUser:IUser = {
    email:"fake@gmail.com",
    languages: "frFR",
    password: "test",
    username: "fakeName",
    genres: {"Angst": 30, "Crime": 70, "Drama": 88, "Humor": 80, "Quest": 48, "Family": 10, "Horror": 2, "Parody": 40, "Poetry": 95, "Sci-fi": 60, "Fantasy": 40, "Mystery": 50, "Romance": 120, "Tragedy": 13, "Western": 55, "Survival": 77, "Suspense": 67, "Adventure": 90, "Spiritual": 21, "Friendship": 60, "Hurt/Comfort": 20, "Supernatural": 49, "Homosexuality": 107},

} 
