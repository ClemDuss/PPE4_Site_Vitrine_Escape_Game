import { User } from './user';

export class Review {
    private _user: User;
    private _date: Date;
    private _idPartie: number;
    private _rate: number;
    private _comment: string;

    constructor(user: User = null, date: Date = null, idPartie: number = null, rate: number = null, comment: string = null){
        this._user = user;
        this._date = date;
        this._idPartie = idPartie;
        this._rate = rate;
        this._comment = comment;

        // GET


        // SET
    }
}
