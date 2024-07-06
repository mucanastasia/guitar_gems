/* eslint-disable react/prop-types */
import './productContent.css';

export default function ProductContent({ guitarData }) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const options = { month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return `${day} ${formattedDate}`;
    };

    const renderSpecs = () => {
        const formattedDate = formatDate(guitarData.release_date);

        const data = [
            ['Brand', guitarData.brand.name],
            ['Type', guitarData.type.name],
            ['Body', guitarData.body_material.name],
            ['Neck', guitarData.neck_material.name],
            ['Fingerboard', guitarData.fingerboard_material.name],
            ['Release date', formattedDate],
            ['Country', guitarData.country.name],
        ];

        return data.map((row) => (
            <tr key={row[0]}>
                <th><p>{row[0]}</p></th>
                <td><p>{row[1]}</p></td>
            </tr>
        ));
    };

    const renderFeatures = () => {
        return guitarData.features.map((feature) => (
            <li key={feature.id}><p>{feature.description}</p></li>
        ));
    };

    return (
        <section className="product-container">
            <div className="wrap">
                <div className="product-content">
                    <article>
                        <h2>Description</h2>
                        <p>{guitarData.description}</p>
                    </article>
                    <article>
                        <h2>Specs</h2>
                        <table>
                            <tbody>
                                {renderSpecs()}
                            </tbody>
                        </table>
                    </article>
                    {guitarData.features?.length > 0 &&
                        <article>
                            <h2>Features</h2>
                            <ul>
                                {renderFeatures()}
                            </ul>
                        </article>
                    }
                </div>
            </div>
        </section>
    );
}