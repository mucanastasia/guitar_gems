import { SearchField as AriaSearchField, Input } from 'react-aria-components';
import { IconButton } from '@ui/icon';
import './SearchField.css';

export function SearchField({ value, onChange, onSubmit, onClear, searchRef }) {
	return (
		<AriaSearchField
			aria-label="Search"
			value={value}
			onChange={onChange}
			onSubmit={onSubmit}
			onClear={onClear}
			onKeyDown={onClear}>
			<IconButton className="icon-search-button" name="search" onClick={onSubmit} />
			<Input aria-label="Search" placeholder="Search" ref={searchRef} type="text" />
			<IconButton className="cancel-icon-button" name="close_small" color="grey" />
		</AriaSearchField>
	);
}
