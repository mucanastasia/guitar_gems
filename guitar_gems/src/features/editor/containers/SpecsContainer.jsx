import { useFilters } from '@api/useFilters';
import { Spinner } from '@ui/spinner';
import { SelectOptionsProvider } from '../contexts/SelectOptionsContext';

export function SpecsContainer({ children }) {
	const { data: selectOptions, isPending } = useFilters();

	if (isPending) {
		return <Spinner />;
	}

	return (
		<SelectOptionsProvider selectOptions={selectOptions}>
			{children}
		</SelectOptionsProvider>
	);
}
