import { useState, useEffect } from 'react';
import { supabase } from '@api/supabaseClient';
import { Link } from 'react-router-dom';
import { useFilters } from '@features/catalogue/contexts/FiltersContext';
import useWindowWidth from './hooks/useWindowWidth';
import { ProductCard } from '@ui/product-card';
// import FiltersContainer from './FiltersContainer';
// import CatalogueHeader from './CatalogueHeader';
import { Skeleton } from '@ui/skeleton';
// import FiltersSideBar from './FiltersSideBar';
import './styles/catalogue.css';
import { CARDS_PER_PAGE, NO_MATCH_TEXT } from '@features/catalogue/constants/catalogue';
import { GUITAR_PATH_DIR } from '@features/router/constants/routePaths';
import { Text } from '@ui/text';
import { useInfiniteScroll } from '@features/catalogue/helpers/useInfiniteScroll';
import { prepareFilter } from '@features/catalogue/helpers/filterHelpers';
import { CatalogueHeaderContainer } from '@features/catalogue/containers/CatalogueHeaderContainer';
import { FiltersDrawerContainer } from '@features/catalogue/containers/FiltersDrawerContainer';
import { FiltersSidebarContainer } from '@features/catalogue/containers/FiltersSidebarContainer';

export default function Catalogue() {
	const [guitars, setGuitars] = useState([]);
	const [loading, setLoading] = useState(true);

	const [hasMore, setHasMore] = useState(true);

	const isMobile = useWindowWidth();
	const { selectedFilters, setSelectedFilters } = useFilters();

	useEffect(() => {
		setHasMore(true);
		fetchData();
	}, []);

	// TODO: Place this function in FiltersContext(?) after extracting fetchData into separate file
	// 		 and I wouldn't need to pass setFilters as a prop
	const handleFilterChange = async (newFilters) => {
		setSelectedFilters(newFilters);
		await fetchData(newFilters, true);
	};

	const fetchData = async (filters = selectedFilters, reset = false) => {
		try {
			setLoading(true);

			if (reset) {
				setGuitars([]);
			}

			await new Promise((resolve) => setTimeout(resolve, 300));

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
				.limit(CARDS_PER_PAGE);

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
				request.gte('release_date', filters.date?.start.toLocaleString('en-GB'));
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

			if (data.length < CARDS_PER_PAGE) {
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

	const lastCardRef = useInfiniteScroll({ loading, hasMore, fetchData });

	const renderGuitars = () => {
		if (!guitars || guitars.length === 0) {
			return <Text size="large">{NO_MATCH_TEXT}</Text>;
		}

		return guitars.map((guitar, index) => {
			if (guitars.length === index + 1) {
				return (
					<Link
						key={guitar.id}
						to={`${GUITAR_PATH_DIR}${guitar.id}`}
						ref={lastCardRef}
						target="_blank"
						rel="noopener noreferrer">
						<ProductCard
							brand={guitar.brand_name}
							name={guitar.name}
							image={guitar.main_img}
						/>
					</Link>
				);
			} else {
				return (
					<Link
						key={guitar.id}
						to={`${GUITAR_PATH_DIR}${guitar.id}`}
						target="_blank"
						rel="noopener noreferrer">
						<ProductCard
							brand={guitar.brand_name}
							name={guitar.name}
							image={guitar.main_img}
						/>
					</Link>
				);
			}
		});
	};

	return (
		<>
			<CatalogueHeaderContainer setFilters={handleFilterChange} />
			<div className="container">
				{!isMobile ? (
					<FiltersSidebarContainer setFilters={handleFilterChange} />
				) : (
					<FiltersDrawerContainer setFilters={handleFilterChange}>
						<FiltersSidebarContainer setFilters={handleFilterChange} />
					</FiltersDrawerContainer>
				)}
				<div className="catalogue-container">
					{loading && guitars.length === 0 ? (
						<Skeleton count={CARDS_PER_PAGE} />
					) : (
						renderGuitars()
					)}
					{loading && guitars.length > 0 && <Skeleton count={CARDS_PER_PAGE} />}
				</div>
			</div>
		</>
	);
}
