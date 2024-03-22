import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';
import * as palette from '../../constants/color';
import ForumTopic from '../../components/ForumTopic/ForumTopic';
import { IForumTopic } from '../../components/ForumTopic/models/models';

const { Title } = Typography;

const mockForumTopicsData: IForumTopic[] = [
	{
		avatarPath: '',
		topicTitle: 'Тема 1',
		responsesNumber: 121,
		id: 1,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 2',
		responsesNumber: 122,
		id: 2,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 3',
		responsesNumber: 123,
		id: 3,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 4',
		responsesNumber: 124,
		id: 4,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 5',
		responsesNumber: 125,
		id: 5,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 6',
		responsesNumber: 126,
		id: 6,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 7',
		responsesNumber: 127,
		id: 7,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 8',
		responsesNumber: 128,
		id: 8,
	},
	{
		avatarPath: '',
		topicTitle: 'Тема 9',
		responsesNumber: 129,
		id: 9,
	},
];

const ForumPageContent = styled(Flex)`
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 760px;
	margin: 0 auto;
`;

const ForumPageTitle = styled(Title)`
	&& {
		color: ${palette.DEEP_OCEAN};
		margin: 44px auto 30px;
		font-weight: bold;
	}
`;

const ForumTopicsContainer = styled(ForumPageContent)`
	gap: 16px;
	height: 70vh;
	overflow-y: auto;
	margin: 0 0 36px;
`;

const ForumButton = styled(Button)`
	margin: 0 0 66px;
`;

export const ForumPage: React.FC = () => (
	<ForumPageContent>
		<ForumPageTitle level={1}>Форумы</ForumPageTitle>
		<ForumTopicsContainer>
			{mockForumTopicsData?.map(({ avatarPath, topicTitle, responsesNumber, id }) => (
				<ForumTopic
					avatarPath={avatarPath}
					topicTitle={topicTitle}
					responsesNumber={responsesNumber}
					key={id}
				/>
			))}
		</ForumTopicsContainer>
		<ForumButton block>Создать тему</ForumButton>
	</ForumPageContent>
);
