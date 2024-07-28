import { useEditorData } from '../../../features/editor/contexts/EditorDataContext';
import { Hero } from '@ui/hero';
import { Spinner } from '@ui/spinner';
import defaultImg from '@assets/img-placeholder.png';

export default function EditorHero({ displayBrandName }) {
	const { data, uploadingPhoto } = useEditorData();

	if (uploadingPhoto) {
		return <Spinner />;
	}

	return (
		<Hero
			img={data.main_img ? data.main_img : defaultImg}
			name={data?.name ? data.name : 'There will be a name'}
			brand={displayBrandName(data.brand_id)}
		/>
	);
}
