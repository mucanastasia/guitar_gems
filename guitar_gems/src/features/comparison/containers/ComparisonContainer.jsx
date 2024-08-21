import { Comparison } from '../components/comparison';
import { Spinner } from '@ui/spinner';
import { IconButton } from '@ui/icon';
import { useEffect, useState } from 'react';
import { TooltipTrigger } from 'react-aria-components';
import { Tooltip } from '@ui/tooltip';
import { useComparison } from '../contexts/ComparisonContext';
import { useCompareGuitars } from '@api/useCompareGuitars';
import { getComparisonFromLS, setComparisonToLS } from '../helpers/localstorageCompare';
import { EmptyCompare } from '../components/empty-compare';
import { useUser } from '@api/useUser';
import { COMPARE_REMOVE_NAME } from '../constants/comparison';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { useHistory } from 'react-router-dom';

export function ComparisonContainer() {
	const guitarsFromLS = getComparisonFromLS() || [];

	const { comparison } = useComparison();
	const guitarIds = comparison.map((guitar) => guitar.id);

	const { data, isPending } = useCompareGuitars(guitarIds);

	const [guitarsToCompare, setGuitarsToCompare] = useState([]);

	const history = useHistory();

	const { data: user } = useUser();

	useEffect(() => {
		setGuitarsToCompare(data || []);
	}, [data]);

	const deleteGuitarFromComparison = (id) => {
		const newGuitarsToCompare = guitarsToCompare.filter((guitar) => guitar.id !== id);
		setGuitarsToCompare(newGuitarsToCompare);
		const newComparison = guitarsFromLS.filter((guitar) => guitar.id !== id);
		setComparisonToLS(newComparison);
	};

	const handleDelete = (id) => {
		deleteGuitarFromComparison(id);
	};

	const handleGuitarClick = (guitarId) => {
		history.push(`${GUITAR_PATH_DIR}${guitarId}`);
	};

	const RemoveFromCompareAction = ({ id }) => {
		return (
			<TooltipTrigger>
				<IconButton
					name="close"
					size="medium"
					className="material-symbols-outlined outlined"
					onClick={() => {
						handleDelete(id);
					}}
				/>
				<Tooltip>{COMPARE_REMOVE_NAME}</Tooltip>
			</TooltipTrigger>
		);
	};

	if (isPending) {
		return <Spinner />;
	}

	if (guitarsToCompare.length === 0) {
		return <EmptyCompare isLoggedIn={user !== null} />;
	}

	return (
		<Comparison
			guitarsToCompare={guitarsToCompare}
			RemoveAction={RemoveFromCompareAction}
			handleGuitarClick={handleGuitarClick}
		/>
	);
}
