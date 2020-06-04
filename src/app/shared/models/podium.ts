export class Podium {
    private _idSalle: number;
    private _nom: string;
    private _prenom: string;
    private _score: number;

    constructor(){
        this.idSalle = null;
        this.nom = null;
        this.prenom = null;
        this.score = null;
    }

    /**
     * Getter idSalle
     * @return {number}
     */
	public get idSalle(): number {
		return this._idSalle;
	}

    /**
     * Getter nom
     * @return {string}
     */
	public get nom(): string {
		return this._nom;
	}

    /**
     * Getter prenom
     * @return {string}
     */
	public get prenom(): string {
		return this._prenom;
	}

    /**
     * Getter score
     * @return {number}
     */
	public get score(): number {
		return this._score;
	}

    /**
     * Setter idSalle
     * @param {number} value
     */
	public set idSalle(value: number) {
		this._idSalle = value;
	}

    /**
     * Setter nom
     * @param {string} value
     */
	public set nom(value: string) {
		this._nom = value;
	}

    /**
     * Setter prenom
     * @param {string} value
     */
	public set prenom(value: string) {
		this._prenom = value;
	}

    /**
     * Setter score
     * @param {number} value
     */
	public set score(value: number) {
		this._score = value;
	}

}
