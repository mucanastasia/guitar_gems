import { CheckboxGroup, Checkbox } from 'react-aria-components';
import { Label } from '@ui/label';
import './FilterGroup.css';

export function FilterGroup({ label, filters, onChange, selectedFilters, Counter }) {
	return (
		<CheckboxGroup onChange={onChange} value={selectedFilters}>
			<Label>
				{label} {`(`}
				<Counter />
				{`)`}
			</Label>
			{filters?.map((filter) => (
				<Checkbox key={filter.id} value={filter.id}>
					<div className="checkbox" aria-hidden="true">
						<svg viewBox="0 0 18 18">
							<polyline points="1 9 7 14 15 4" />
						</svg>
					</div>
					{filter.name}
				</Checkbox>
			))}
		</CheckboxGroup>
	);
}
