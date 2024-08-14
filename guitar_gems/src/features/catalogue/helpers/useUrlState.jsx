import { useEffect } from 'react';
import { parseDate } from '@internationalized/date';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelectedFilters } from '../contexts/SelectedFiltersContext';

export const useUrlState = () => {
	const location = useLocation();
	const history = useHistory();
	const { setSelectedFilters } = useSelectedFilters();

	useEffect(() => {
		const params = queryString.parse(location.search);
		const deserializedFilters = deserializeFilters(params);
		setSelectedFilters(deserializedFilters);
	}, []);

	const updateURL = (newFilters) => {
		const newParams = serializeFilters(newFilters);
		history.replace({
			pathname: location.pathname,
			search: queryString.stringify(newParams),
		});
	};

	const formatDate = (date) => {
		const year = date.year.toString().padStart(4, '0');
		const month = date.month.toString().padStart(2, '0');
		const day = date.day.toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	const parseToDateValue = (dateStr) => {
		try {
			return parseDate(dateStr);
		} catch (error) {
			console.error('Failed to parse date:', dateStr, error);
			return null;
		}
	};

	const serializeFilters = (filters) => {
		const params = {};

		if (filters.brands.length) params.brands = filters.brands.join(',');
		if (filters.types.length) params.types = filters.types.join(',');
		if (filters.materials.length) params.materials = filters.materials.join(',');
		if (filters.countries.length) params.countries = filters.countries.join(',');

		if (filters.date.start) params.startDate = formatDate(filters.date.start);
		if (filters.date.end) params.endDate = formatDate(filters.date.end);

		if (filters.query) {
			params.query = filters.query;
		}

		return params;
	};

	const deserializeFilters = (params) => {
		return {
			brands: params.brands ? params.brands.split(',').map(Number) : [],
			types: params.types ? params.types.split(',').map(Number) : [],
			materials: params.materials ? params.materials.split(',').map(Number) : [],
			countries: params.countries ? params.countries.split(',').map(Number) : [],
			date: {
				start: params.startDate ? parseToDateValue(params.startDate) : null,
				end: params.endDate ? parseToDateValue(params.endDate) : null,
			},
			query: params.query || '',
		};
	};

	return {
		updateURL,
	};
};
