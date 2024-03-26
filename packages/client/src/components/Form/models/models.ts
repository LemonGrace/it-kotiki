import { RcFile } from 'antd/es/upload';
import { ReactNode } from 'react';

export enum EFIELD_TYPE {
	LOGIN = 'login',
	OLD_PASSWORD = 'oldPassword',
	NEW_PASSWORD = 'newPassword',
	PASSWORD = 'password',
	NAME = 'first_name',
	SURNAME = 'second_name',
	EMAIL = 'email',
	PHONE = 'phone',
}

export interface IFormConfig {
	submitBtnText: string;
	fields: EFIELD_TYPE[];
}

export interface IFieldConfig {
	label: string;
	name: EFIELD_TYPE;
	type: any;
	required: boolean;
	pattern: string;
	placeholder: string;
	message?: string;
	prefix?: ReactNode;
}

export interface ISigninFormBody {
	login: string;
	password: string;
}

export interface ISignupFormBody {
	first_name: string;
	second_name: string;
	email: string;
	phone: string;
	login: string;
	password: string;
}

export interface IPasswordFormBody {
	oldPassword: string;
	newPassword: string;
}

export interface IProfileFormBody {
	first_name: string;
	second_name: string;
	email: string;
	phone: string;
	login: string;
	newPassword: string;
	oldPassword: string;
	upload: RcFile[];
}
