export interface IContactModalDataToSend {
	userName: string;
	userTel: string;
}

export interface IContactModal {
	isActive: boolean;
	isLoading: boolean;
	dataToSend: IContactModalDataToSend;
}
