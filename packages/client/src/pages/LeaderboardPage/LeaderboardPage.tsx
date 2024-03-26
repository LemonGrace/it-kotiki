import { useState } from 'react';
import { Flex, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import * as palette from '../../constants/color';
import { LeaderboardItem } from '../../components/LeaderboardItem/LeaderboardItem';
import { ILeaderboardItem } from '../../components/LeaderboardItem/models/models';
import { LeaderboardControls } from '../../components/LeaderboardControls/LeaderboardControls';
import { FieldData } from '../../components/LeaderboardControls/models/models';

const { Title } = Typography;

const mockLeaderobardData: ILeaderboardItem[] = [
	{
		userPosition: 1,
		avatarPath: '',
		playerName: 'Игрок 1',
		scoreTotal: 143,
		scoreToday: 18,
		id: 1,
	},
	{
		userPosition: 2,
		avatarPath: '',
		playerName: 'Игрок 2',
		scoreTotal: 114,
		scoreToday: 4,
		id: 2,
	},
	{
		userPosition: 3,
		avatarPath: '',
		playerName: 'Игрок 3',
		scoreTotal: 165,
		scoreToday: 15,
		id: 3,
	},
];

const PageContent = styled(Flex)`
	flex-direction: column;
	align-items: center;
	height: 100%;
	width: 760px;
	margin: 0 auto;
`;

const ContentContainer = styled(PageContent)`
	gap: 16px;
	justify-content: flex-start;
	height: 70vh;
	overflow-y: auto;
	margin: 0 0 36px;
`;

const PageTitle = styled(Title)`
	&& {
		margin: 44px auto 30px;
		color: ${palette.DEEP_PURPLE};
		font-weight: bold;
	}
`;

const objectSorter = (data: ILeaderboardItem[], value: string, order: string) => {
	if (!value) return data;
	return data?.sort((a, b) => {
		if (order) {
			return a[value] < b[value] ? 1 : -1;
		} else {
			return a[value] > b[value] ? 1 : -1;
		}
	});
};

export const LeaderboardPage: React.FC = () => {
	const [isControlsOpen, setIsControlsOpen] = useState(false);
	const [sortedData, setSortedData] = useState(mockLeaderobardData);
	const [data, setData] = useState(mockLeaderobardData);

	const toggleControls = () => setIsControlsOpen(!isControlsOpen);

	const handleSorter = (values: FieldData[]) => {
		const sortedData = objectSorter(data, values[1].value, values[0].value);
		setSortedData(sortedData);
		setData(sortedData);
	};

	const handleFilter = (values: FieldData[]) => {
		setData(values[0].value ? data.slice(0, 10) : sortedData);
	};

	return (
		<>
			<PageContent>
				<PageTitle level={1}>
					Рейтинг игроков
					<FilterOutlined onClick={toggleControls} rev={undefined} />
				</PageTitle>
				<ContentContainer>
					{data?.map(({ userPosition, avatarPath, playerName, scoreTotal, scoreToday, id }) => (
						<LeaderboardItem
							userPosition={userPosition}
							avatarPath={avatarPath}
							playerName={playerName}
							scoreTotal={scoreTotal}
							scoreToday={scoreToday}
							key={id}
						/>
					))}
				</ContentContainer>
				<LeaderboardControls
					isOpen={isControlsOpen}
					onClose={toggleControls}
					onSorterChange={handleSorter}
					onFilterChange={handleFilter}
				/>
			</PageContent>
		</>
	);
};
