export class News {
    private _id: number;
    private _title: string;
    private _startDate: Date;
    private _endDate: Date;
    private _description: string;
    private _activated: boolean;

    constructor(
        id: number = null,
        title: string = null,
        startDate: Date = null,
        endDate: Date = null,
        description: string = null,
        activated: boolean = true
    ){
        this._id = id;
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
        this._description = description;
        this._activated = activated;
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
