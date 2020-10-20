import { CustomAction } from './custom.action';

export enum EOrdersFormActions {
	SendData = '[Orders Form] Send Data',
	SendDataSucces = '[Orders Form] Send Data Succes',
	SendDataError = '[Orders Form] Send Data Error',
	DataSend = '[ORders Form] Data Send',
}

// tslint:disable-next-line: max-classes-per-file
export class SendData implements CustomAction {
	public readonly type: string = EOrdersFormActions.SendData;
}

// tslint:disable-next-line: max-classes-per-file
export class SendDataSucces implements CustomAction {
	public readonly type: string = EOrdersFormActions.SendDataSucces;

	constructor(public payload: any) { }
}

// tslint:disable-next-line: max-classes-per-file
export class SendDataError implements CustomAction {
	public readonly type: string = EOrdersFormActions.SendDataError;
}

// tslint:disable-next-line: max-classes-per-file
export class DataSend implements CustomAction {
	public readonly type: string = EOrdersFormActions.DataSend;
}
