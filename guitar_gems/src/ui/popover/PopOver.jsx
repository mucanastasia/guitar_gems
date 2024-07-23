import { Popover as AriaPopover, OverlayArrow, Dialog } from 'react-aria-components';
import './Popover.css';

export function Popover({ children }) {
	return (
		<AriaPopover>
			<OverlayArrow>
				<svg width={12} height={12} viewBox="0 0 12 12">
					<path d="M0 0 L6 6 L12 0" />
				</svg>
			</OverlayArrow>
			<Dialog>
				<div className="popover">{children}</div>
			</Dialog>
		</AriaPopover>
	);
}
