import { useTranslation } from "react-i18next";
import CheckBoxField from '../inputFields/CheckBoxField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';

const AppSettingsProductListTab = ({ nameKey, productData, description, customName, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[values][${nameKey}][title]`, placeholder: t("enter_title"), title: "title" }]} />
             {description && <SimpleInputField nameList={[{ name: `[values][${nameKey}][description]`, placeholder: t("enter_description"), title: "description" }]} />}
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
        <CheckBoxField name={`[values][${nameKey}][status]`} title="status" />
        </>
    )
}

export default AppSettingsProductListTab