export enum EUserPermission {
	admin = 'admin',
	moderator = 'moderator',
	user = 'user'
}
export interface IAuthTokenServerData {
	token: string;
	expiresIn: number;
	userPermission: string;
}

export interface IAuthTokenData {
	token: string;
	expirationDate: Date;
	userEmail?: string;
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
