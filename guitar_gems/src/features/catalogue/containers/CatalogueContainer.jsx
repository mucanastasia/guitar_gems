import { Catalogue } from '../components/catalogue/Catalogue';
import { useWindowWidth } from '@helpers/useWindowWidth';
import { DrawerProvider } from '../contexts/DrawerContext';

export function CatalogueContainer() {
	const isMobile = useWindowWidth();

	return (
		<DrawerProvider>
			<Catalogue isMobile={isMobile} />
		</DrawerProvider>
	);
}
