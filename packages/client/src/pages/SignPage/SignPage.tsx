import { Flex, Typography } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { SIGN_PAGE_CONFIG } from './сonstants/SignPageConfig';
import { TSignPageType } from './models/models';
import { Form } from '../../components/Form/Form';
import { useLocation, useNavigate, useOutletContext } from 'react-router';
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models';
import { auth } from '../../utils/api/auth';
import { AUTH_ENDPOINT } from '../../utils/api/consts';
import { ISigninFormBody, ISignupFormBody } from '../../components/Form/models/models';

interface IProps {
	type: TSignPageType;
}

export const SignPage: FC<IProps> = ({ type }) => {
	const CONFIG = SIGN_PAGE_CONFIG[type];
	const location = useLocation();
	const navigate = useNavigate();
	const fromPage = location.state?.from.pathname || EPATH.MAIN;
	const { openNotification } = useOutletContext();

	const handleAuth = (body: ISigninFormBody | ISignupFormBody) => {
		return auth(AUTH_ENDPOINT[type], body)
			.then(() => {
				localStorage.setItem('auth', 'true');
				navigate(fromPage, { replace: true });
			})
			.catch(errorReason => {
				if (errorReason === 'User already in system') {
					localStorage.setItem('auth', 'true');
					navigate(fromPage, { replace: true });
				}
				openNotification(ENOTIFICATION_TYPE.ERROR, errorReason);
			});
	};

	return (
		<Flex vertical align="center" justify="center">
			<Typography.Title level={1}>{CONFIG.title}</Typography.Title>
			<Form type={type} onSubmit={handleAuth} />
			<Link to={CONFIG.linkTo}>{CONFIG.textLink}</Link>
		</Flex>
	);
};
