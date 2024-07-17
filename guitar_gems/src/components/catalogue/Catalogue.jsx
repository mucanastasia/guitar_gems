import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import FiltersContainer from './FiltersContainer';
import CatalogueHeader from './CatalogueHeader';
import Skeleton from '../spinner/Skeleton';
import './styles/catalogue.css';

export default function Catalogue() {
	const [guitars, setGuitars] = useState([]);
	const [loading, setLoading] = useState(true);

	const [hasMore, setHasMore] = useState(true);
	const cardsPerPage = 12;

	useEffect(() => {
		setHasMore(true);
		fetchData();
	}, []);

	const observer = useRef();
	const lastCardRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					fetchData();
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	const handleFilterChange = async (newFilters) => {
		setSelectedFilters(newFilters);
		await fetchData(newFilters, true);
	};

	const [selectedFilters, setSelectedFilters] = useState({
		brands: [],
		types: [],
		materials: [],
		countries: [],
		date: { start: null, end: null },
		query: '',
	});

	const prepareFilter = (selectedList, fieldNames) => {
		const filter = selectedList
			.map((id) =>
				fieldNames.map((fieldName) => `${fieldName}.eq.${id}`).join(',')
			)
			.join(',');
		return filter;
	};

	const fetchData = async (filters = selectedFilters, reset = false) => {
		try {
			setLoading(true);
			let request = supabase
				.from('searchable_guitars')
				.select(
					`
						id,
						name,
						main_img,
						brand_name
                    `
				)
				.order('id', { ascending: true })
				.limit(cardsPerPage);

			if (filters.brands.length > 0) {
				request = request.or(prepareFilter(filters.brands, ['brand_id']));
			}
			if (filters.types.length > 0) {
				request = request.or(prepareFilter(filters.types, ['type_id']));
			}
			if (filters.materials.length > 0) {
				request = request.or(
					prepareFilter(filters.materials, [
						'body_material_id',
						'neck_material_id',
						'fingerboard_material_id',
					])
				);
			}
			if (filters.countries.length > 0) {
				request = request.or(prepareFilter(filters.countries, ['country_id']));
			}
			if (filters.date.start && filters.date.end) {
				request.gte(
					'release_date',
					filters.date?.start.toLocaleString('en-GB')
				);
				request.lte('release_date', filters.date?.end.toLocaleString('en-GB'));
			}

			if (filters.query.length > 0) {
				request.or(
					`name.ilike.%${filters.query}%,full_text_search.wfts.${filters.query},brand_name.ilike.%${filters.query}%,type_name.ilike.%${filters.query}%,body_material_name.ilike.%${filters.query}%,neck_material_name.ilike.%${filters.query}%,fingerboard_material_name.ilike.%${filters.query}%,country_name.ilike.%${filters.query}%`
				);
			}

			if (!reset && guitars.length > 0) {
				const lastGuitarId = guitars[guitars.length - 1].id;
				request.gt('id', lastGuitarId);
			}

			const { data, error } = await request;

			if (error) throw error;

			setGuitars(reset ? data : [...guitars, ...data]);

			if (data.length < cardsPerPage) {
				setHasMore(false);
			} else {
				setHasMore(true);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const renderCatalogue = () => {
		if (!guitars || guitars.length === 0) {
			return <p>No guitars available.</p>;
		}

		return guitars.map((guitar, index) => {
			if (guitars.length === index + 1) {
				return (
					<Link
						key={guitar.id}
						to={`/guitars/${guitar.id}`}
						ref={lastCardRef}>
						<ProductCard guitarData={guitar} />
					</Link>
				);
			} else {
				return (
					<Link
						key={guitar.id}
						to={`/guitars/${guitar.id}`}>
						<ProductCard guitarData={guitar} />
					</Link>
				);
			}
		});
	};

	return (
		<>
			<CatalogueHeader
				selected={selectedFilters}
				setSelected={handleFilterChange}
			/>
			<div className="container">
				<FiltersContainer
					selected={selectedFilters}
					setSelected={handleFilterChange}
				/>
				<div className="catalogue-container">
					{loading && guitars.length === 0 ? (
						<Skeleton count={cardsPerPage} />
					) : (
						renderCatalogue()
					)}
					{loading && guitars.length > 0 && <Skeleton count={cardsPerPage} />}
				</div>
			</div>
		</>
	);
}
