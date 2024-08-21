import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { COMPARE_PATH } from '@features/router/constants/routePaths';
import { useComparison } from '@features/comparison/contexts/ComparisonContext';
import { CompareBar } from '../components/compare-bar/CompareBar';
import {
	getComparisonFromLS,
	setCompareBarOpenToLS,
	setComparisonToLS,
} from '../helpers/localstorageCompare';

export function CompareBarContainer() {
	const { comparison, setComparison, isOpen, setIsOpen } = useComparison();

	useEffect(() => {
		setComparison(getComparisonFromLS() || []);
	}, []);

	const history = useHistory();

	const removeFromCompare = (guitarId) => {
		const newComparison = comparison.filter((guitar) => guitar.id !== guitarId);
		setComparison(newComparison);
		setComparisonToLS(newComparison);
	};

	const handleOpenBar = () => {
		setIsOpen((prev) => !prev);
		setCompareBarOpenToLS(!isOpen);
	};

	const handleClickCompare = () => {
		history.push(COMPARE_PATH);
	};

	return (
		<CompareBar
			comparison={comparison}
			setComparison={setComparison}
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			removeFromCompare={removeFromCompare}
			history={history}
			handleOpenBar={handleOpenBar}
			handleClickCompare={handleClickCompare}
		/>
	);
}
