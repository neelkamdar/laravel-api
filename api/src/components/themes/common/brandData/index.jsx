import BrandIdsContext from '@/helper/brandIdsContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useMemo } from 'react';

const BrandData = ({ classes = {}, dataAPI, height, width ,removeClass }) => {

    const { filteredBrand } = useContext(BrandIdsContext);


    return (
        <>
            <div className={`brand-section ${!removeClass ?"section-t-space":""} ` }>
                <div className={`brand-row ${filteredBrand?.length < 6 ? "no-bg" : ''}`}>
                    <ul className="row g-sm-4 g-3 row-cols-xl-6 row-cols-lg-5 row-cols-sm-4 row-cols-2 justify-content-sm-center brand-list-box">
                        {filteredBrand?.map((brand, i) => (
                            <li key={i}>
                                <Link href={`/brand/${brand.slug}`}>
                                    {brand.brand_image ? (
                                        <Image src={brand.brand_image.original_url} className="img-fluid" height={height} width={width} alt={brand?.name || ""} />
                                    ) :
                                        <h3>{brand.name}</h3>
                                    }
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default BrandData;
