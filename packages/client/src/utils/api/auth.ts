import { authUrl } from './consts';
import { ISigninFormBody, ISignupFormBody } from '../../components/Form/models/models';
import axios from 'axios';

export const auth = (type: string, body: ISigninFormBody | ISignupFormBody) => {
	return axios
		.post(`${authUrl}/${type}`, body, {
			withCredentials: true,
			'Content-Type': 'application/json',
		})
		.then(res => res.data)
		.catch(err => Promise.reject(err.response.data.reason));
};

export const logout = () => {
	return axios
		.post(
			`${authUrl}/logout`,
			{},
			{
				withCredentials: true,
				'Content-Type': 'application/json',
			},
		)
		.then(res => res.data)
		.catch(err => Promise.reject(err.response.data.reason));
};
