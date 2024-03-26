export interface ILeaderboardItem {
	[key: string]: string | number;
	userPosition: number;
	avatarPath: string;
	playerName: string;
	scoreTotal: number;
	scoreToday: number;
	id: number;
}
