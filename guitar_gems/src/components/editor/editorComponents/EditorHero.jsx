import { useEditorData } from '../contexts/EditorDataContext';
import Hero from '../../product/Hero';
import Spinner from '../../spinner/Spinner';
import defaultImg from '../../../assets/img-placeholder.png';

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
