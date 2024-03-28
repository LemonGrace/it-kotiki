import styled from 'styled-components';
import { DEEP_OCEAN, DEEP_PURPLE, LIGHT_PURPLE, ORANGE } from '../../../constants/color';
import { Card, Statistic, Typography } from 'antd';
import { Modal } from '../../../components/Modal/Modal';

const { Title } = Typography;

export const StartGameTitle = styled(Title)`
	&.ant-typography {
		color: ${DEEP_PURPLE};
		margin: 44px 0 12px;
	}
`;
export const Countdown = styled(Statistic.Countdown)`
	> .ant-statistic-content {
		font-size: 46px;
		color: ${DEEP_PURPLE};
		text-shadow: 0 4px 4px ${ORANGE};
	}
`;

export const HintCardWrapper = styled.div`
	margin: 60px 0 60px;
	display: flex;
	flex-direction: row;
	gap: 24px;
`;

export const HintCard = styled(Card)`
	background: ${LIGHT_PURPLE};
	border: 2px solid ${DEEP_OCEAN};
	color: ${DEEP_PURPLE};
	padding: 24px;

	> .ant-card-head {
		border: none;
		margin-bottom: 8px;
		padding: 0;
		min-height: 28px;
		color: ${DEEP_PURPLE};
	}

	> .ant-card-body {
		padding: 0;
	}
`;

export const EndGameModal = styled(Modal)`
	border-radius: 12px;
	height: 260px;
	width: 570px;

	.ant-modal-title {
		color: #f96767;
		font-weight: bold;
		font-size: 30px;
		line-height: 45px;
		text-align: center;
	}

	.ant-modal-body {
		color: #ffc8c8;
		text-align: center;
		font-weight: bold;
		margin: 16px 0 10px;
		white-space: pre-wrap;
	}

	.ant-modal-footer {
		display: flex;
		justify-content: space-between;

		.ant-btn-primary {
			background-color: ${DEEP_OCEAN}25;
			border: 1px dashed ${DEEP_PURPLE};
			color: ${DEEP_PURPLE};
			font-weight: bold;

			&:hover {
				background-color: ${DEEP_OCEAN}25;
				color: ${ORANGE};
				border: 1px dashed ${ORANGE};
			}
		}
	}
`;
