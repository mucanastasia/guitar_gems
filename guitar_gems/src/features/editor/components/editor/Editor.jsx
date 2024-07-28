import { Form } from 'react-aria-components';
import { ProductCard } from '@ui/product-card';
import { PhotoUploaderContainer } from '../../containers/PhotoUploaderContainer';
import { EditorFormContainer } from '../../containers/EditorFormContainer';
import { EditorHeaderContainer } from '../../containers/EditorHeaderContainer';
import { EditorHeroContainer } from '../../containers/EditorHeroContainer';
import { IMG_PLACEHOLDER_URL, NAME_PLACEHOLDER } from '../../constants/editor';
import './Editor.css';

export function Editor({
	handleSubmit,
	displayBrandName,
	uploadingPhoto,
	setUploadingPhoto,
	name,
	brandId,
	image,
}) {
	return (
		<>
			<EditorHeroContainer
				displayBrandName={displayBrandName}
				image={image}
				uploadingPhoto={uploadingPhoto}
				brandId={brandId}
			/>
			<div className="editor-wrap">
				<Form onSubmit={handleSubmit}>
					<EditorHeaderContainer />
					<div className="product-content-container">
						<div>
							<ProductCard
								brand={displayBrandName(brandId)}
								name={name ? name : NAME_PLACEHOLDER}
								image={image ? image : IMG_PLACEHOLDER_URL}
							/>
							<PhotoUploaderContainer
								uploadingPhoto={uploadingPhoto}
								setUploadingPhoto={setUploadingPhoto}
							/>
						</div>
						<EditorFormContainer />
					</div>
				</Form>
			</div>
		</>
	);
}
