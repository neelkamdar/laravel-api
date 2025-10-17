import WrapperComponent from '@/components/common/WrapperComponent';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useContext } from 'react';

const SellerSelling = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'selling-section section-b-space' }}>
      <div className='vendor-title'>
        <h5>{themeOption?.seller?.start_selling?.title}</h5>
        <p>{themeOption?.seller?.start_selling?.description}</p>
      </div>
        <a  target='_blank' href={themeOption?.general?.seller_register_url} className='text-light theme-bg-color d-inline-block mt-3 btn' >Start Selling</a>
    </WrapperComponent>
  );
};

export default SellerSelling;
