import { CustomAction } from './custom.action';

export enum EMenuActions {
	OpenMenuStart = '[Menu] Open Menu Start',
	OpenMenuEnd = '[Menu] Open Menu End',
	CloseMenuStart = '[Menu] Close Menu Start',
	CloseMenuEnd = '[Menu] Close Menu End'
}

// tslint:disable-next-line: max-classes-per-file
export class OpenMenuStart implements CustomAction {
	public readonly type: string = EMenuActions.OpenMenuStart;
}

// tslint:disable-next-line: max-classes-per-file
export class OpenMenuEnd implements CustomAction {
	public readonly type: string = EMenuActions.OpenMenuEnd;
}

// tslint:disable-next-line: max-classes-per-file
export class CloseMenuStart implements CustomAction {
	public readonly type: string = EMenuActions.CloseMenuStart;
}

// tslint:disable-next-line: max-classes-per-file
export class CloseMenuEnd implements CustomAction {
	public readonly type: string = EMenuActions.CloseMenuEnd;
}
