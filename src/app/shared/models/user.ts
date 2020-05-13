export class User {
    private _id: number;
    private _mail: string;
    private _prenom: string;
    private _nom: string;

    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get mail(): string {
        return this._mail;
    }
    public set mail(value: string) {
        this._mail = value;
    }
    public get prenom(): string {
        return this._prenom;
    }
    public set prenom(value: string) {
        this._prenom = value;
    }
    public get nom(): string {
        return this._nom;
    }
    public set nom(value: string) {
        this._nom = value;
    }

    constructor(id: number = null, mail: string = null, prenom: string = null, nom: string = null){
        this.id = null;
        this._mail = mail;
        this._prenom = prenom;
        this._nom = nom;
    }

    // GET
    public getMail(): string{
        return this._mail;
    }

    public getPrenom(): string{
        return this._prenom;
    }

    public getNom(): string{
        return this._nom;
    }

    // SET
    public setMail(mail: string): void{
        this._mail = mail;
    }

    public setPrenom(prenom: string): void{
        this._prenom = prenom;
    }

    public setNom(nom: string): void{
        this._nom = nom;
    }
}
