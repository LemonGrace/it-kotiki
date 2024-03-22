import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import * as palette from '../../constants/color';
import { Card } from '../Card/Card';
import { IForumTopic } from './models/models';

const { Title, Text } = Typography;

const ForumCardAvatar = styled(Avatar)`
	margin: 0;
	width: 44px;
	height: 44px;
`;

const ForumCardTitle = styled(Title)`
	&& {
		margin: 0 auto 0 16px;
		color: ${palette.DEEP_OCEAN};
		font-weight: bold;
	}
`;

const ForumCardResponses = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ResponsesNumber = styled(Text)`
	font-weight: bold;
`;

const ForumTopic: React.FC<Omit<IForumTopic, 'id'>> = ({ avatarPath, topicTitle, responsesNumber }) => (
	<Card>
		<ForumCardAvatar src={avatarPath} />
		<ForumCardTitle level={2}>{topicTitle}</ForumCardTitle>
		<ForumCardResponses>
			<Text>Ответов:</Text>
			<ResponsesNumber>{responsesNumber}</ResponsesNumber>
		</ForumCardResponses>
	</Card>
);

export default ForumTopic;
