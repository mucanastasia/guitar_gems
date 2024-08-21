import { useRef } from 'react';
import { Subscription } from '../components/subscription';
import { validateEmail } from '@features/auth/helpers/formHelpers';
import toast from 'react-hot-toast';

export function SubscriptionContainer() {
	const subscribeEmailRef = useRef(null);

	const handleSubscribe = (e) => {
		const email = subscribeEmailRef.current.value;
		e.preventDefault();
		if (!email) {
			return;
		}
		if (!validateEmail(email)) {
			toast.error('Please enter a valid email address');
			return;
		}
		toast.success(`${email} successfully subscribed to our newsletter!`);
	};

	const handleChange = (e) => {
		subscribeEmailRef.current.value = e.target.value;
	};

	return (
		<Subscription
			onSubmit={handleSubscribe}
			subscribeEmailRef={subscribeEmailRef}
			handleChange={handleChange}
		/>
	);
}
