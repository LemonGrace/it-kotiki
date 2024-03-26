import { FormProps } from 'antd';

export type FieldData = Exclude<FormProps['fields'], undefined>[number];

export interface ILeaderboardControlsProps {
	isOpen: boolean;
	onClose: () => void;
	onSorterChange: (fields: FieldData[]) => void;
	onFilterChange: (fields: FieldData[]) => void;
}
