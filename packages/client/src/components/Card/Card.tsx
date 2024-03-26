import { Card as ACard } from 'antd';
import styled from 'styled-components';

export const Card = styled(ACard)`
	& {
		width: 100%;
		height: 80px;

		.ant-card-body {
			display: flex;
			gap: 16px;
			align-items: center;
			justify-content: space-between;
			padding: 17.5px 8px;
		}
	}
`;
