import { Avatar, Typography } from 'antd';
import { Card } from '../Card/Card';
import * as palette from '../../constants/color';
import styled from 'styled-components';
import { ILeaderboardItem } from './models/models';

const { Text, Title } = Typography;

const LeaderboardCard = styled(Card)`
	border: 1px solid ${palette.DEEP_PURPLE};
	border-radius: 12px;
`;

const CardTitle = styled(Title)`
	&& {
		margin: 0 auto 0 16px;
		color: ${palette.DEEP_PURPLE};
		font-weight: bold;
	}
`;

const CardAvatar = styled(Avatar)`
	width: 44px;
	height: 44px;
`;

const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const CardText = styled(Text)`
	color: ${palette.DEEP_PURPLE};
`;

const BoldText = styled(CardText)`
	font-weight: bold;
`;

export const LeaderboardItem: React.FC<Omit<ILeaderboardItem, 'id'>> = ({
	userPosition,
	avatarPath,
	playerName,
	scoreTotal,
	scoreToday,
}) => (
	<LeaderboardCard>
		<BoldText>{userPosition}</BoldText>
		<CardAvatar src={avatarPath} />
		<CardTitle level={2}>{playerName}</CardTitle>
		<CardInfo>
			<CardText>Общее число очков:</CardText>
			<BoldText>{scoreTotal}</BoldText>
		</CardInfo>
		<CardInfo>
			<CardText>Очки за сегодня:</CardText>
			<BoldText>{scoreToday}</BoldText>
		</CardInfo>
	</LeaderboardCard>
);
