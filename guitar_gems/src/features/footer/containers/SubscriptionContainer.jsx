import { Subscription } from '@features/footer/components/subscription';

export function SubscriptionContainer() {
	const handleSubscribe = (e) => {
		e.preventDefault();
	};

	return <Subscription onSubmit={handleSubscribe} />;
}
