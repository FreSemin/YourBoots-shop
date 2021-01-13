export interface IAuthTokenData {
	token: string;
	expirationDate: Date;
	userEmail?: string;
}

export interface IAuthTokenServerData {
	token: string;
	expiresIn: number;
}

export class AuthTokenData implements IAuthTokenData {
	public token: string;
	public expirationDate: Date;
	public userEmail: string;

	constructor(tokenData: IAuthTokenData) {
		this.token = tokenData.token;
		this.expirationDate = new Date(tokenData.expirationDate);
		this.userEmail = tokenData.userEmail;
	}
}
