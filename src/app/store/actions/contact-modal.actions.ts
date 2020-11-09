import { IContactModalDataToSend } from 'src/app/components/models/contact-modal/contact-modal.model';
import { CustomAction } from './custom.action';

export enum EContactModalActions {
	OnActive = '[Contact Modal] Open Model',
	OnClose = '[Contact Modal] Close Model',
	OnSendData = '[Contact Modal] Send Data',
	OnSendDataSucces = '[Contact Modal] Send Data Succes',
	OnSendDataError = '[Contact Modal] Send Data Error'
}

export class OnActive implements CustomAction {
	public readonly type: string = EContactModalActions.OnActive;
}

// tslint:disable-next-line: max-classes-per-file
export class OnClose implements CustomAction {
	public readonly type: string = EContactModalActions.OnClose;
}

// tslint:disable-next-line: max-classes-per-file
export class OnSendData implements CustomAction {
	public readonly type: string = EContactModalActions.OnSendData;
}

// tslint:disable-next-line: max-classes-per-file
export class OnSendDataSucces implements CustomAction {
	public readonly type: string = EContactModalActions.OnSendDataSucces;

	constructor(public payload: IContactModalDataToSend) { }
}

// tslint:disable-next-line: max-classes-per-file
export class OnSendDataError implements CustomAction {
	public readonly type: string = EContactModalActions.OnSendDataError;
}
