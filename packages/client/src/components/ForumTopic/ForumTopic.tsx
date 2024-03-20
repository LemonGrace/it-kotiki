import { Card, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { IForumTopic } from './models/models';

const { Title } = Typography;

const ForumCard = styled(Card)`
	& {
		border: 1px solid #00536b;
		border-radius: 24px;
		color: #00536b;
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

const ForumCardAvatar = styled(Avatar)`
	&& {
		margin: 0;
		width: 44px;
		height: 44px;
	}
`;

const ForumCardTitle = styled(Title)`
	&& {
		margin: 0 auto 0 16px;
		color: #00536b;
		font-size: 16px;
		font-weight: bold;
	}
`;

const ForumCardResponses = styled.div`
	text-align: center;
`;

const ResponsesNumber = styled.div`
	font-weight: bold;
`;

const ForumTopic: React.FC<Omit<IForumTopic, 'id'>> = ({ avatarPath, topicTitle, responsesNumber }) => (
	<ForumCard>
		<ForumCardAvatar src={avatarPath} />
		<ForumCardTitle>{topicTitle}</ForumCardTitle>
		<ForumCardResponses>
			<div>Ответов:</div>
			<ResponsesNumber>{responsesNumber}</ResponsesNumber>
		</ForumCardResponses>
	</ForumCard>
);

export default ForumTopic;
