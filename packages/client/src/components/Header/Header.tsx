import { FC } from 'react';
import { Avatar, Layout } from 'antd';
import { EPATH } from '../../models/models';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

export const Header: FC = () => {
	return (
		<Layout.Header>
			<Link to={EPATH.PROFILE}>
				<Avatar size="small" icon={<UserOutlined />} />
			</Link>
		</Layout.Header>
	);
};
