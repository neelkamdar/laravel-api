import { TabPane } from 'reactstrap'
import SellerPage from '../homePage3/SellerPage'
import ProductList1Tab from '../homePage5/ProductList1Tab'
import CouponBanner9Tab from './CouponBanner9Tab'
import SliderProduct9Tab from './SliderProduct9Tab'
import TwoColumnBanner9Tab from './TwoColumnBanner9Tab'

const MiddleTabs9 = ({storeData,setStoreSearch, values, setFieldValue, productData, categoryData, setSearch }) => {

    return (
        <>
            <TabPane tabId="3">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_1'} productData={productData} customName={"productListImage1"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="4">
                <TwoColumnBanner9Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="5">
                <SellerPage setStoreSearch={setStoreSearch} storeData={storeData}  />
            </TabPane>
            <TabPane tabId="6">
                <SliderProduct9Tab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="7">
                <CouponBanner9Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="8">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_2'} productData={productData} customName={"productListImage2"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="9">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_3'} productData={productData} customName={"productListImage3"} setSearch={setSearch} />
            </TabPane>
        </>
    )
}

export default MiddleTabs9