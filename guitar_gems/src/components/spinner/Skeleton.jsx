import './styles/skeleton.css';

export default function Skeleton({ count = 12 }) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="skeleton-card"></div>
			))}
		</>
	);
}
