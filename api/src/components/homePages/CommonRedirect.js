import { redirectOptions } from '../../data/TabTitleList';
import MultiSelectField from '../inputFields/MultiSelectField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';

import { useTranslation } from "react-i18next";

const CommonRedirect = ({ values, setFieldValue, productData, categoryData, nameList, setSearch }) => {
    const { selectNameKey, multipleNameKey } = nameList
    
    const { t } = useTranslation( 'common');
    const redirectLink = (name, value) => {
        setFieldValue(selectNameKey, value?.id)
    }
    const selectProduct = (name, value) => {
        setFieldValue(multipleNameKey, value?.id)
    }

    return (
        <>
            <SearchableSelectInput
                nameList={
                    [
                        {
                            name: selectNameKey,
                            title: "select_link",
                            inputprops: {
                                name: selectNameKey,
                                id: selectNameKey,
                                options: redirectOptions || [],
                                value: redirectOptions.find((elem) => elem.id == values[selectNameKey])?.name || '',
                                close: true
                            },
                            store: "obj",
                            setvalue: redirectLink,
                        },
                    ]} />
            {
                values[selectNameKey] == 'product' ?
                    <SearchableSelectInput
                        nameList={
                            [
                                {
                                    name: multipleNameKey,
                                    title: "products",
                                    inputprops: {
                                        name: multipleNameKey,
                                        id: multipleNameKey,
                                        options: productData || [],
                                        setsearch: setSearch,
                                        value: values[multipleNameKey]?.name ? values[multipleNameKey]?.name : productData?.find((elem) => elem.id == values[multipleNameKey])?.name || "",
                                        close: true
                                    },
                                    store: "obj",
                                    setvalue: selectProduct,
                                },
                            ]} />
                    : values[selectNameKey] == 'collection' ?
                        <MultiSelectField values={values} setFieldValue={setFieldValue} name={multipleNameKey} title="Collection" data={categoryData || []} key="Collection" getValuesKey='slug' />
                        : values[selectNameKey] == 'external_url' ?
                            <SimpleInputField nameList={[{ name: multipleNameKey, type: "url", placeholder: t("enter_redirect_link"), title: "redirect_link" }]} key="RedirectLink" />
                            : null
            }
        </>
    )
}

export default CommonRedirect