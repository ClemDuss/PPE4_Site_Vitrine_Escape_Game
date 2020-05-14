export class LoginInformation {
    private _email: string;
    private _connectionDate: Date;
    private _stayConnected: boolean;

    constructor(theEmail: string = null, theConnectionDate: Date = null, theStayConnected: boolean = null){
        this.email = theEmail;
        this.connectionDate = theConnectionDate;
        this.stayConnected = theStayConnected;
    }

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter connectionDate
     * @return {Date}
     */
	public get connectionDate(): Date {
		return this._connectionDate;
	}

    /**
     * Getter stayConnected
     * @return {boolean}
     */
	public get stayConnected(): boolean {
		return this._stayConnected;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter connectionDate
     * @param {Date} value
     */
	public set connectionDate(value: Date) {
		this._connectionDate = value;
	}

    /**
     * Setter stayConnected
     * @param {boolean} value
     */
	public set stayConnected(value: boolean) {
		this._stayConnected = value;
	}
}
