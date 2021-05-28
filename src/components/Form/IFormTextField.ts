export interface IFormTextFieldProps{
    fieldInformation: ITextField;
}

export interface IFormTextFieldStates{

}

export interface ITextField{
    name: string;
    label: string;
    onChange: (e:any) => void;
    autocomplete?:string;
    default?: String;
    multiline?:boolean;
    row?:number;
    password?: boolean;
}