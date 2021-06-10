export interface INavBarProps{
    selected: number;
    history?:any;
}

export interface INavItems{
    id:number;
    text:string;
    icon:JSX.Element;
    link:string;
}
