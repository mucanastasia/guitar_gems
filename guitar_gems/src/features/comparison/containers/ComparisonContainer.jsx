import { Comparison } from '../components/comparison';
import { Spinner } from '@ui/spinner';
import { IconButton } from '@ui/icon';
import { useEffect, useState } from 'react';
import { TooltipTrigger } from 'react-aria-components';
import { Tooltip } from '@ui/tooltip';
import { useComparison } from '../contexts/ComparisonContext';
import { useCompareGuitars } from '@api/useCompareGuitars';

export function ComparisonContainer() {
	const guitarsFromLS = JSON.parse(localStorage.getItem('comparison')) || [];

	const { comparison } = useComparison();
	const guitarIds = comparison.map((guitar) => guitar.id);

	const { data, isPending } = useCompareGuitars(guitarIds);

	const [guitarsToCompare, setGuitarsToCompare] = useState([]);

	useEffect(() => {
		setGuitarsToCompare(data || []);
	}, [data]);

	const numberOfGuitars = guitarsToCompare.length;

	const deleteGuitarFromComparison = (id) => {
		const newGuitarsToCompare = guitarsToCompare.filter((guitar) => guitar.id !== id);
		setGuitarsToCompare(newGuitarsToCompare);
		const newComparison = guitarsFromLS.filter((guitar) => guitar.id !== id);
		localStorage.setItem('comparison', JSON.stringify(newComparison));
	};

	const handleDelete = (id) => {
		deleteGuitarFromComparison(id);
	};

	const DeleteAction = ({ id }) => {
		return (
			<TooltipTrigger>
				<IconButton
					name="close"
					size="medium"
					className="material-symbols-outlined outlined"
					onClick={() => {
						handleDelete(id);
					}}
					preventDefault
				/>
				<Tooltip>Delete from comparison</Tooltip>
			</TooltipTrigger>
		);
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<Comparison
			guitarsToCompare={guitarsToCompare}
			numberOfGuitars={numberOfGuitars}
			EditorActions={DeleteAction}
		/>
	);
}
