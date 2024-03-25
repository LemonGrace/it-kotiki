import { Button } from 'antd';
import { useNavigate, useOutletContext } from 'react-router';
import { logout } from '../../utils/api/auth';
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models';

export const ProfilePage = () => {
	const navigate = useNavigate();
	const { openNotification } = useOutletContext();

	const handleLogout = () => {
		logout()
			.then(() => {
				localStorage.setItem('auth', 'false');
				navigate(EPATH.SIGN_IN, { replace: true });
			})
			.catch(err => {
				openNotification(ENOTIFICATION_TYPE.ERROR, err.reason);
			});
	};

	return (
		<>
			<Button onClick={handleLogout} htmlType="button">
				Выйти
			</Button>
		</>
	);
};
