import { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from '../Header/Header';
import { ConfigProvider, Layout as ALayout, notification } from 'antd';
import { ENOTIFICATION_TYPE, EPATH } from '../../models/models';
import { ANTD_CONFIG } from '../../constants/antd.config';

export const Layout: FC = () => {
	const { pathname } = useLocation();
	const isSignPage = [EPATH.SIGN_IN as string, EPATH.SIGN_UP as string].includes(pathname);
	const [api, contextHolder] = notification.useNotification();

	const openNotification = (type: ENOTIFICATION_TYPE, errorReason = 'Что-то пошло не так...') => {
		api[type]({
			message: 'Упс.. проблемка',
			description: errorReason,
		});
	};
	return (
		<ConfigProvider theme={ANTD_CONFIG}>
			<ALayout style={{ height: '100%' }}>
				{contextHolder}
				{!isSignPage && <Header />}
				<ALayout.Content>
					<Outlet context={{ openNotification }} />
				</ALayout.Content>
				<ALayout.Footer style={{ textAlign: 'center' }}>
					&#169;IT-котики {new Date().getFullYear()}
				</ALayout.Footer>
			</ALayout>
		</ConfigProvider>
	);
};
