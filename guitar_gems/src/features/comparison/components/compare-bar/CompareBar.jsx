import { Button } from '@ui/button';
import { IconButton, Icon } from '@ui/icon';
import { Text } from '@ui/text';

import { TagGroup, TagList, Tag, Button as AriaButton } from 'react-aria-components';
import { useHistory } from 'react-router-dom';
import { COMPARE_PATH } from '@features/router/constants/routePaths';
import { useComparison } from '@features/comparison/contexts/ComparisonContext';

import './CompareBar.css';
import { useEffect } from 'react';

export function CompareBar() {
	const { comparison, setComparison, isOpen, setIsOpen } = useComparison();

	useEffect(() => {
		setComparison(JSON.parse(localStorage.getItem('comparison')) || []);
	}, []);

	const history = useHistory();

	const handleRemove = (guitarId) => {
		const newComparison = comparison.filter((guitar) => guitar.id !== guitarId);
		setComparison(newComparison);
		localStorage.setItem('comparison', JSON.stringify(newComparison));
	};

	return (
		<div
			className={`compare-bar ${isOpen && 'open'}`}
			style={{ display: comparison.length > 0 ? 'flex' : 'none' }}>
			<div className="compare-bar__content">
				<IconButton
					name={`keyboard_arrow_${isOpen ? 'down' : 'up'}`}
					size="medium"
					onClick={() => {
						setIsOpen((prev) => !prev);
						localStorage.setItem('comparison-Open', !isOpen);
					}}
				/>
				<div className="compare-bar__title">
					<Text size="small">Guitars to compare:</Text>
				</div>
				<TagGroup
					aria-label="A list of guitars to compare with remove buttons"
					items={comparison}>
					<TagList>
						{comparison.map((guitar) => (
							<Tag key={guitar.id} textValue={guitar.name}>
								<Text size="xsmall">{guitar.name}</Text>
								<AriaButton slot="remove" onPress={() => handleRemove(guitar.id)}>
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
				onClick={() => history.push(COMPARE_PATH)}
				disabled={comparison.length < 2}>
				Compare
			</Button>
		</div>
	);
}
