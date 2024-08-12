import { HeadingLogo } from '@ui/heading-logo';
import { AuthPromptContainer } from '../../containers/AuthPromptContainer';
import { AUTH_IMG_URL } from '../../constants/auth';
import './AuthWrapper.css';

export function AuthWrapper({ children, isDesktop, name, path }) {
	return (
		<div className="auth-wrapper">
			{isDesktop && (
				<div
					className="img-guitar"
					style={{ backgroundImage: `url(${AUTH_IMG_URL})` }}></div>
			)}
			<div className="auth-form">
				<HeadingLogo name={name} path={path} />

				{children}

				<AuthPromptContainer />
			</div>
		</div>
	);
}
