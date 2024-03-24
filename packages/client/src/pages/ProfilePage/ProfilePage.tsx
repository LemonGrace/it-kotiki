import { Button, Flex, Typography } from 'antd';
import { useNavigate, useOutletContext } from 'react-router';
import styled from 'styled-components';
import { DEEP_PURPLE, LIGHT_OCEAN } from '../../constants/color';
import { logout } from '../../utils/api/auth';
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models';
import { ProfileDataView } from '../../components/ProfileDataView/ProfileDataView';
import { ProfileDataForm } from '../../components/ProfileDataForm/ProfileDataForm';
import { useState } from 'react';

export type UserDTO = {
	id: number;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	avatar: string;
	phone: string;
	email: string;
};

const userData: UserDTO = {
	id: 2,
	login: 'Pavel',
	first_name: 'Павел',
	second_name: 'Дуров',
	display_name: 'PavelDurov',
	avatar: 'https://sotni.ru/wp-content/uploads/2023/08/avatarka-kot-1.webp',
	phone: '+79999999090',
	email: 'mail@gmail.com',
};

const ProfilePageContent = styled(Flex)`
	flex-direction: column;
	align-items: center;
	width: 476px;
	margin: 32px auto;
`;

const ProfilePageNav = styled(Flex)`
	align-items: center;
	width: 100%;
	margin-bottom: 32px;
`;

const ProfilePageNavItem = styled(Flex)`
	align-items: center;
	text-align: center;
	width: 50%;
	border-bottom: 4px solid rgba(98, 37, 159, 0.3);
	opacity: 0.6;

	&:hover {
		opacity: 0.6;
	}

	&.active {
		opacity: 1;
	}
`;

const NavItemTypography = styled(Typography)`
	width: 100%;
	cursor: pointer;
	padding: 10px 0;
	color: ${DEEP_PURPLE};
	font-weight: 700;
	font-size: 24px;
`;

const UserImgContainer = styled(Flex)`
	justify-container: center;

	.wrapper {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: ${LIGHT_OCEAN};
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: color;
		}
	}
`;

const ProfilePageBottom = styled(Flex)`
	width: 100%;
	justify-content: flex-end;
`;

export const ProfilePage = () => {
	const [activeBlock, setActiveBlock] = useState('preview');
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
		<ProfilePageContent>
			<UserImgContainer>
				<div className="wrapper">
					<img src={userData.avatar} alt="" />
				</div>
			</UserImgContainer>
			<ProfilePageNav>
				<ProfilePageNavItem
					className={activeBlock === 'preview' ? 'active' : ''}
					onClick={() => setActiveBlock('preview')}>
					<NavItemTypography>Просмотр</NavItemTypography>
				</ProfilePageNavItem>
				<ProfilePageNavItem
					className={activeBlock === 'form' ? 'active' : ''}
					onClick={() => setActiveBlock('form')}>
					<NavItemTypography>Редактирование</NavItemTypography>
				</ProfilePageNavItem>
			</ProfilePageNav>
			{activeBlock === 'preview' ? <ProfileDataView data={userData} /> : <ProfileDataForm data={userData} />}
			<ProfilePageBottom>
				<Button onClick={handleLogout} htmlType="button">
					Выйти
				</Button>
			</ProfilePageBottom>
		</ProfilePageContent>
	);
};