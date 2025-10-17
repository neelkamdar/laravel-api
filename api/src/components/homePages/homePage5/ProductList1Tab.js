import CheckBoxField from '../../inputFields/CheckBoxField';
import SearchableSelectInput from '../../inputFields/SearchableSelectInput';
import SimpleInputField from '../../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const ProductList1Tab = ({ nameKey, productData, description, customName, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][${nameKey}][title]`, placeholder: t("enter_title"), title: "title" }]} />
            {description && <SimpleInputField nameList={[{ name: `[content][${nameKey}][description]`, placeholder: t("enter_description"), title: "description" }]} />}
            {
                productData && <SearchableSelectInput
                    nameList={
                        [{
                            name: customName ? customName : 'productListProductIds',
                            title: "products",
                            inputprops: {
                                name: customName ? customName : 'productListProductIds',
                                id: customName ? customName : 'productListProductIds',
                                options: productData || [],
                                setsearch: setSearch,
                            }
                        },
                        ]}
                />
            }
            <CheckBoxField name={`[content][${nameKey}][status]`} title="status" />
        </>
    )
}

export default ProductList1Tab