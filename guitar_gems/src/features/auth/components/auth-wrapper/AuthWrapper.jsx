import guitar from '@assets/guitar.webp';
import { HeadingLogo } from '@ui/heading-logo';
import { AuthPromptContainer } from '../../containers/AuthPromptContainer';
import './AuthWrapper.css';

export function AuthWrapper({ children, isDesktop, name, path }) {
	return (
		<div className="auth-wrapper">
			{isDesktop && (
				<div className="img-guitar" style={{ backgroundImage: `url(${guitar})` }}></div>
			)}
			<div className="auth-form">
				<HeadingLogo name={name} path={path} />

				{children}

				<AuthPromptContainer />
			</div>
		</div>
	);
}
