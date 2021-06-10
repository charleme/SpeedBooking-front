import {IBookWithProgress} from "../../data_interface/IBook";

export interface IStates{
    listBook: IBookWithProgress[];
    isLoading: boolean;
}