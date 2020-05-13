export class DisplayParameters {
    private _id: number;
    private _displayName: string;
    private _parameter: string;


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get displayName(): string {
        return this._displayName;
    }
    public set displayName(value: string) {
        this._displayName = value;
    }
    public get parameter(): string {
        return this._parameter;
    }
    public set parameter(value: string) {
        this._parameter = value;
    }

    

    constructor(displayName: string = null, parameter: string = null){
        this._displayName = displayName;
        this._parameter = parameter;
    }

    // SET
    public setDisplayName(displayName: string): void{
        this._displayName = displayName;
    }

    public setParameter(parameter: string){
        this._parameter = parameter;
    }

    // GET
    public getDisplayName(): string{
        return this._displayName;
    }

    public getParameter(): string{
        return this._parameter;
    }
}
