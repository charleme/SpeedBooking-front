export default interface ITextField{
    name: string;
    label: string;
    onChange: (e:any) => void;
    autocomplete?:string;
    default?: String;
    multiline?:boolean;
    row?:number;
}