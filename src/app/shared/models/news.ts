export class News {
    private _id: number;
    private _title: string;
    private _startDate: Date;
    private _endDate: Date;
    private _description: string;
    private _activated: boolean;

    constructor(){
        this._id = null;
        this._title = "";
        this._startDate = null;
        this._endDate = null;
        this._description = "";
        this._activated = true;
    }

    //GET
    public getId(): number{
        return this._id;
    }

    public getTitle(): string{
        return this._title;
    }

    public getStartDate(): Date{
        return this._startDate;
    }

    public getEndDate(): Date{
        return this._endDate;
    }

    public getDescription(): string{
        return this._description;
    }

    public getActivated(): boolean{
        return this._activated;
    }

    //SET
    public setId(theId: number): void{
        this._id = theId;
    }

    public setTitle(theTitle: string): void{
        this._title = theTitle;
    }

    public setStartDate(theStartDate: Date): void{
        this._startDate = theStartDate;
    }

    public setEndDate(theEndDate: Date): void{
        this._endDate = theEndDate;
    }

    public setDescription(theDescription: string): void{
        this._description = theDescription;
    }

    public setActivated(theActivated: boolean): void{
        this._activated = theActivated;
    }
}
