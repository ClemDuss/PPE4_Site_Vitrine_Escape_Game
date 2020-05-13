import { User } from './user';

export class Review {
    private _user: User;
    private _date: Date;
    private _idPartie: number;
    private _rate: number;
    private _comment: string;

    
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public get idPartie(): number {
        return this._idPartie;
    }
    public set idPartie(value: number) {
        this._idPartie = value;
    }
    public get rate(): number {
        return this._rate;
    }
    public set rate(value: number) {
        this._rate = value;
    }
    public get comment(): string {
        return this._comment;
    }
    public set comment(value: string) {
        this._comment = value;
    }

    constructor(user: User = null, date: Date = null, idPartie: number = null, rate: number = null, comment: string = null){
        this._user = user;
        this._date = date;
        this._idPartie = idPartie;
        this._rate = rate;
        this._comment = comment;
    }

    // GET
    public getUser(): User{
        return this._user;
    }

    public getDate(): Date{
        return this._date;
    }

    public getIdPartie(): number{
        return this._idPartie;
    }

    public getRate(): number{
        return this._rate;
    }

    public getComment(): string{
        return this._comment;
    }

    // SET
    public setUser(user: User){
        this._user = user;
    }

    public setDate(date: Date){
        this._date = date;
    }

    public setIdPartie(idPartie: number){
        this._idPartie = idPartie;
    }

    public setRate(rate: number){
        this._rate = rate;
    }

    public setComment(comment: string){
        this._comment = comment;
    }

    
}
