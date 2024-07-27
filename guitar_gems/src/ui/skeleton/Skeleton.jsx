import './Skeleton.css';

export function Skeleton({ count = 12 }) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="skeleton-card"></div>
			))}
		</>
	);
}

export function SkeletonFilters() {
	return (
		<div className="skeleton-filters">
			<div className="skeleton-filters-group">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="skeleton-filters-item"></div>
				))}
			</div>

			<div className="skeleton-filters-group">
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className="skeleton-filters-item"></div>
				))}
			</div>

			<div className="skeleton-filters-group">
				{Array.from({ length: 8 }).map((_, index) => (
					<div key={index} className="skeleton-filters-item"></div>
				))}
			</div>

			<div className="skeleton-filters-group">
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className="skeleton-filters-item"></div>
				))}
			</div>

			<div className="skeleton-filters-group">
				<div className="skeleton-filters-item"></div>
				<div className="skeleton-data-picker"></div>
			</div>
		</div>
	);
}
