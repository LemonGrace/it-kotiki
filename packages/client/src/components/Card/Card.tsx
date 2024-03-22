import { Card as ACard } from 'antd';
import * as palette from '../../constants/color';
import styled from 'styled-components';

export const Card = styled(ACard)`
	& {
		border: 1px solid ${palette.DEEP_OCEAN};
		border-radius: 24px;
		color: ${palette.DEEP_OCEAN};
		width: 100%;
		height: 80px;

		.ant-card-body {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 17.5px 24px;
		}
	}
`;
