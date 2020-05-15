export class Room {
    private _id: number;
    private _nom: string;
    private _idVille: number;
    private _idThemeActuel: number;
    private _heureOuverture: Date;
    private _heureFermeture: Date;

	constructor() {
        this.id = null;
        this.nom = null;
        this.idVille = null;
        this.idThemeActuel = null;
        this.heureOuverture = null;
        this.heureFermeture = null;
	}


    //GET

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter nom
     * @return {string}
     */
	public get nom(): string {
		return this._nom;
	}

    /**
     * Getter idVille
     * @return {number}
     */
	public get idVille(): number {
		return this._idVille;
	}

    /**
     * Getter idThemeActuel
     * @return {number}
     */
	public get idThemeActuel(): number {
		return this._idThemeActuel;
	}

    /**
     * Getter heureOuverture
     * @return {Date}
     */
	public get heureOuverture(): Date {
		return this._heureOuverture;
	}

    /**
     * Getter heureFermeture
     * @return {Date}
     */
	public get heureFermeture(): Date {
		return this._heureFermeture;
	}
    

    //SET

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter nom
     * @param {string} value
     */
	public set nom(value: string) {
		this._nom = value;
	}

    /**
     * Setter idVille
     * @param {number} value
     */
	public set idVille(value: number) {
		this._idVille = value;
	}

    /**
     * Setter idThemeActuel
     * @param {number} value
     */
	public set idThemeActuel(value: number) {
		this._idThemeActuel = value;
	}

    /**
     * Setter heureOuverture
     * @param {Date} value
     */
	public set heureOuverture(value: Date) {
		this._heureOuverture = value;
	}

    /**
     * Setter heureFermeture
     * @param {Date} value
     */
	public set heureFermeture(value: Date) {
		this._heureFermeture = value;
	}
}
