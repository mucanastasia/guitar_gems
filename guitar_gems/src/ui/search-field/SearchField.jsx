import {
	SearchField as AriaSearchField,
	Input,
	Button as AriaButton,
} from 'react-aria-components';
import { Icon } from '@ui/icon';
import './SearchField.css';

export function SearchField({ onSubmit, onClear, searchRef }) {
	return (
		<AriaSearchField
			aria-label="Search"
			onSubmit={onSubmit}
			onClear={onClear}
			onKeyDown={onClear}>
			<Icon name="search" onClick={onSubmit} />
			<Input aria-label="Search" placeholder="Search" ref={searchRef} type="text" />
			<AriaButton>
				<Icon name="close_small" color="grey" />
			</AriaButton>
		</AriaSearchField>
	);
}
