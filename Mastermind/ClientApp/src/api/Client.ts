﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.5.0.0 (NJsonSchema v10.1.15.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

export interface IClient {
    /**
     * @return Success
     */
    startNewGame(): Promise<string>;
    /**
     * @param guid (optional) 
     * @return Success
     */
    quitGame(guid: string | undefined): Promise<void>;
    /**
     * @param guid (optional) 
     * @param body (optional) 
     * @return Success
     */
    nextTry(guid: string | undefined, body: Colour[] | null | undefined): Promise<Score>;
    /**
     * @param guid (optional) 
     * @return Success
     */
    status(guid: string | undefined): Promise<BooleanInt32ValueTuple>;
    /**
     * @param guid (optional) 
     * @return Success
     */
    allPlayedRows(guid: string | undefined): Promise<Row[]>;
    /**
     * @param guid (optional) 
     * @return Success
     */
    masterRow(guid: string | undefined): Promise<Row>;
}

export class Client implements IClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @return Success
     */
    startNewGame(): Promise<string> {
        let url_ = this.baseUrl + "/api/Mastermind/StartNewGame";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processStartNewGame(_response);
        });
    }

    protected processStartNewGame(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(<any>null);
    }

    /**
     * @param guid (optional) 
     * @return Success
     */
    quitGame(guid: string | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Mastermind/QuitGame?";
        if (guid === null)
            throw new Error("The parameter 'guid' cannot be null.");
        else if (guid !== undefined)
            url_ += "guid=" + encodeURIComponent("" + guid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "POST",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processQuitGame(_response);
        });
    }

    protected processQuitGame(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }

    /**
     * @param guid (optional) 
     * @param body (optional) 
     * @return Success
     */
    nextTry(guid: string | undefined, body: Colour[] | null | undefined): Promise<Score> {
        let url_ = this.baseUrl + "/api/Mastermind/NextTry?";
        if (guid === null)
            throw new Error("The parameter 'guid' cannot be null.");
        else if (guid !== undefined)
            url_ += "guid=" + encodeURIComponent("" + guid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processNextTry(_response);
        });
    }

    protected processNextTry(response: Response): Promise<Score> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = Score.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Score>(<any>null);
    }

    /**
     * @param guid (optional) 
     * @return Success
     */
    status(guid: string | undefined): Promise<BooleanInt32ValueTuple> {
        let url_ = this.baseUrl + "/api/Mastermind/Status?";
        if (guid === null)
            throw new Error("The parameter 'guid' cannot be null.");
        else if (guid !== undefined)
            url_ += "guid=" + encodeURIComponent("" + guid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processStatus(_response);
        });
    }

    protected processStatus(response: Response): Promise<BooleanInt32ValueTuple> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = BooleanInt32ValueTuple.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BooleanInt32ValueTuple>(<any>null);
    }

    /**
     * @param guid (optional) 
     * @return Success
     */
    allPlayedRows(guid: string | undefined): Promise<Row[]> {
        let url_ = this.baseUrl + "/api/Mastermind/AllPlayedRows?";
        if (guid === null)
            throw new Error("The parameter 'guid' cannot be null.");
        else if (guid !== undefined)
            url_ += "guid=" + encodeURIComponent("" + guid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAllPlayedRows(_response);
        });
    }

    protected processAllPlayedRows(response: Response): Promise<Row[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [] as any;
                    for (let item of resultData200)
                        result200!.push(Row.fromJS(item));
                }
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Row[]>(<any>null);
    }

    /**
     * @param guid (optional) 
     * @return Success
     */
    masterRow(guid: string | undefined): Promise<Row> {
        let url_ = this.baseUrl + "/api/Mastermind/MasterRow?";
        if (guid === null)
            throw new Error("The parameter 'guid' cannot be null.");
        else if (guid !== undefined)
            url_ += "guid=" + encodeURIComponent("" + guid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processMasterRow(_response);
        });
    }

    protected processMasterRow(response: Response): Promise<Row> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = Row.fromJS(resultData200);
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Row>(<any>null);
    }
}

export enum Colour {
    Black = "black",
    Blue = "blue",
    Green = "green",
    Red = "red",
    Yellow = "yellow",
    White = "white",
}

export class Score implements IScore {
    same?: number;
    sameColour?: number;

    constructor(data?: IScore) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.same = _data["same"];
            this.sameColour = _data["sameColour"];
        }
    }

    static fromJS(data: any): Score {
        data = typeof data === 'object' ? data : {};
        let result = new Score();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["same"] = this.same;
        data["sameColour"] = this.sameColour;
        return data;
    }
}

export interface IScore {
    same?: number;
    sameColour?: number;
}

export class BooleanInt32ValueTuple implements IBooleanInt32ValueTuple {
    item1?: boolean;
    item2?: number;

    constructor(data?: IBooleanInt32ValueTuple) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.item1 = _data["item1"];
            this.item2 = _data["item2"];
        }
    }

    static fromJS(data: any): BooleanInt32ValueTuple {
        data = typeof data === 'object' ? data : {};
        let result = new BooleanInt32ValueTuple();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["item1"] = this.item1;
        data["item2"] = this.item2;
        return data;
    }
}

export interface IBooleanInt32ValueTuple {
    item1?: boolean;
    item2?: number;
}

export class Pin implements IPin {
    colour?: Colour;
    position?: number;

    constructor(data?: IPin) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.colour = _data["colour"];
            this.position = _data["position"];
        }
    }

    static fromJS(data: any): Pin {
        data = typeof data === 'object' ? data : {};
        let result = new Pin();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["colour"] = this.colour;
        data["position"] = this.position;
        return data;
    }
}

export interface IPin {
    colour?: Colour;
    position?: number;
}

export class Row implements IRow {
    readonly pins?: Pin[] | undefined;

    constructor(data?: IRow) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["pins"])) {
                (<any>this).pins = [] as any;
                for (let item of _data["pins"])
                    (<any>this).pins!.push(Pin.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Row {
        data = typeof data === 'object' ? data : {};
        let result = new Row();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.pins)) {
            data["pins"] = [];
            for (let item of this.pins)
                data["pins"].push(item.toJSON());
        }
        return data;
    }
}

export interface IRow {
    pins?: Pin[] | undefined;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}