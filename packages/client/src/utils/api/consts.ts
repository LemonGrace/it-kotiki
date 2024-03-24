import { EPAGE_TYPE } from '../../models/models';

export const authUrl = 'https://ya-praktikum.tech/api/v2/auth';

export const AUTH_ENDPOINT = {
	[EPAGE_TYPE.SIGNIN]: 'signin',
	[EPAGE_TYPE.SIGNUP]: 'signup',
};
