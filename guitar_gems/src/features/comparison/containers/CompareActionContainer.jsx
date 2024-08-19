import { IconButton } from '@ui/icon';
import { Button } from '@ui/button';
import { Tooltip } from '@ui/tooltip';
import { TooltipTrigger } from 'react-aria-components';
import { useComparison } from '../contexts/ComparisonContext';
import { useCallback } from 'react';
import { setComparisonToLS } from '../helpers/localstorageCompare';
import { COMPARE_ACTION_NAME, COMPARE_REMOVE_NAME } from '../constants/comparison';
import { useRouteMatch } from 'react-router-dom';
import { GUITAR_PATH } from '@features/router/constants/routePaths';

export const CompareActionContainer = ({ id, name }) => {
	const { comparison, setComparison } = useComparison();

	const findGuitarInCompare = useCallback(
		(id) => {
			return comparison.find((guitar) => guitar.id === id) !== undefined;
		},
		[comparison]
	);

	const addToCompare = (id, name) => {
		if (comparison.length >= 3) {
			return;
		} else {
			const newComparison = [...comparison, { id, name }];
			setComparison(newComparison);
			setComparisonToLS(newComparison);
		}
	};

	const removeFromCompare = (id) => {
		const newComparison = comparison.filter((guitar) => guitar.id !== id);
		setComparison(newComparison);
		setComparisonToLS(newComparison);
	};

	const handleClickCompare = () => {
		findGuitarInCompare(id) ? removeFromCompare(id) : addToCompare(id, name);
	};

	const isProductPage = Boolean(useRouteMatch(GUITAR_PATH));

	if (isProductPage) {
		return (
			<Button
				state={
					findGuitarInCompare(id)
						? 'toggle-accent'
						: comparison.length === 3
						? 'none'
						: 'toggle-primary'
				}
				onClick={handleClickCompare}>
				{findGuitarInCompare(id) ? COMPARE_REMOVE_NAME : COMPARE_ACTION_NAME}
			</Button>
		);
	}

	return (
		<TooltipTrigger>
			<IconButton
				name="compare"
				size="medium"
				className={`material-symbols-outlined ${
					findGuitarInCompare(id)
						? 'filled-compare'
						: comparison.length === 3
						? 'none'
						: 'outlined'
				}`}
				onClick={handleClickCompare}
				preventDefault
			/>
			<Tooltip>
				{findGuitarInCompare(id) ? COMPARE_REMOVE_NAME : COMPARE_ACTION_NAME}
			</Tooltip>
		</TooltipTrigger>
	);
};
