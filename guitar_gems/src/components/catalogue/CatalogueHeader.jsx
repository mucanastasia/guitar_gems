import { Button, Input, SearchField } from 'react-aria-components';
import logo from '../../../public/apple-touch-icon.png';
import './catalogueHeader.css';

export default function CatalogueHeader() {
    return (
        <div className="catalogue-page-header">
            <div className="logo">
                <img src={logo} alt="Guitar Gems logo image" />
                <h1>Guitar Gems</h1>
            </div>
            <div className="catalogue-header">
                <div className="wrap">
                    <div className="filters-label">
                        <span className="material-symbols-outlined">tune</span>
                        <p>Filters</p>
                    </div>
                    <SearchField aria-label="Search">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <Input aria-label="Search" placeholder="Search" />
                        <Button className="react-aria-Button material-symbols-outlined">close_small</Button>
                    </SearchField>
                </div>
            </div>
        </div>
    );
}