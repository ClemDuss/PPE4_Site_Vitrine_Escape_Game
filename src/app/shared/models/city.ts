export class City {
    private _id: number;
    private _nomVille: string;

    constructor(){
        this.id = null;
        this.nomVille = null;
    }


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter nomVille
     * @return {string}
     */
	public get nomVille(): string {
		return this._nomVille;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter nomVille
     * @param {string} value
     */
	public set nomVille(value: string) {
		this._nomVille = value;
	}

}
