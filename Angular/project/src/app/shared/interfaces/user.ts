export interface IAge{
    year:number,
    month:number,
    day:number
}

export interface User {
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    age:IAge,
    address:string
}
