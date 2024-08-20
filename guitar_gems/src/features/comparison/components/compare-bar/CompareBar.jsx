import { Button } from '@ui/button';
import { IconButton, Icon } from '@ui/icon';
import { Text } from '@ui/text';
import { TagGroup, TagList, Tag, Button as AriaButton } from 'react-aria-components';
import {
	COMPARE_TITLE,
	COMPARE_BUTTON,
	COMPARE_MAX_TEXT,
} from '../../constants/comparison';
import './CompareBar.css';

export function CompareBar({
	comparison,
	handleOpenBar,
	handleClickCompare,
	isOpen,
	removeFromCompare,
}) {
	return (
		<div className={`compare-bar ${isOpen && 'open'}`}>
			<div className="compare-bar__content">
				<IconButton
					name={`${isOpen ? 'keyboard_arrow_down' : 'compare_arrows'}`}
					size="medium"
					onClick={handleOpenBar}
				/>
				<div className="compare-bar__title">
					<Text size="small">{COMPARE_TITLE}</Text>
				</div>
				<TagGroup aria-label={COMPARE_TITLE} items={comparison}>
					<TagList renderEmptyState={() => <Text size="xsmall">{COMPARE_MAX_TEXT}</Text>}>
						{comparison.map((guitar) => (
							<Tag key={guitar.id} textValue={guitar.name}>
								<Text size="xsmall">{guitar.name}</Text>
								<AriaButton slot="remove" onPress={() => removeFromCompare(guitar.id)}>
									<Icon name="close" size="small" />
								</AriaButton>
							</Tag>
						))}
					</TagList>
				</TagGroup>
			</div>
			<Button
				state="primary"
				width="180px"
				onClick={handleClickCompare}
				disabled={comparison.length < 2}>
				{COMPARE_BUTTON}
			</Button>
		</div>
	);
}
