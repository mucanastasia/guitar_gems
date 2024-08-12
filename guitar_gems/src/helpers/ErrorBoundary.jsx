import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	render() {
		const fallback = this.props.fallback ?? <h1>Something went wrong. </h1>;

		if (this.state.hasError) {
			return fallback;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
