export class MediasPublies {
    private _id: number;
    private _media: string;

    constructor(theId: number = null, theTypeMedia: string = null, theMedia: string = null){
        this.id = theId;
        this.media = theMedia;
    }

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter media
     * @return {string}
     */
	public get media(): string {
		return this._media;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter media
     * @param {string} value
     */
	public set media(value: string) {
		this._media = value;
	}
    
}
