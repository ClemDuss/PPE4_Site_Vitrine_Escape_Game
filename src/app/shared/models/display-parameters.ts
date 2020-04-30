export class DisplayParameters {
    private _displayName: string;
    private _parameter: string;

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
