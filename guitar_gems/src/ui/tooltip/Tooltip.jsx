import { Tooltip as AriaTooltip, OverlayArrow } from 'react-aria-components';
import './Tooltip.css';

export function Tooltip({ children }) {
	return (
		<AriaTooltip>
			<OverlayArrow>
				<svg width={8} height={8} viewBox="0 0 8 8">
					<path d="M0 0 L4 4 L8 0" />
				</svg>
			</OverlayArrow>
			{children}
		</AriaTooltip>
	);
}
