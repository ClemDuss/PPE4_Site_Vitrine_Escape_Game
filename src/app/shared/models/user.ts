export class User {
    private _mail: string;
    private _prenom: string;
    private _nom: string;

    constructor(mail: string = null, prenom: string = null, nom: string = null){
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
