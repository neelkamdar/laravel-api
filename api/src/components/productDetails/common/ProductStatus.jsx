
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { RiQuestionnaireLine, RiRulerLine, RiTruckLine } from 'react-icons/ri';
import { Progress } from 'reactstrap';
import DeliveryReturnModal from './allModal/DeliveryReturnModal';
import QuestionAnswerModal from './allModal/QuestionAnswerModal';
import SizeModal from './allModal/SizeModal';

const ProductStatus = ({ productState }) => {
  const isLogin = Cookies.get('uaf');
  
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation( 'common');
  const [modal, setModal] = useState('');
  const getQTY = productState?.selectedVariation?.quantity ? productState?.selectedVariation?.quantity : productState?.product?.quantity;
  const getStockStatus = productState?.selectedVariation?.stock_status ?? productState?.product?.stock_status;
  const activeModal = {
    size: <SizeModal modal={modal} setModal={setModal} productState={productState} />,
    delivery: <DeliveryReturnModal modal={modal} setModal={setModal} productState={productState} />,
    qna: <QuestionAnswerModal modal={modal} setModal={setModal} productState={productState} />,
  };

  const getProgressValue = (productState) => {
    if (productState?.selectedVariation) {
      return 100 - (productState?.selectedVariation?.quantity * 100) / 10;
    } else {
      return 100 - (productState?.product?.quantity * 100) / 10;
    }
  };
  return (
    <>
      {!productState.product?.is_external && productState.product.status &&
        <>
          {getStockStatus !== 'out_of_stock' ? (
            productState?.selectedVariation?.quantity <= 10 ?? productState?.product?.quantity <= 10 ? (
              <div className='progress-sec'>
                <div className='left-progressbar'>
                  <h6>
                    {t('please_hurry_only')} {productState?.selectedVariation?.quantity ?? productState?.product?.quantity} {t('left_in_stock')}
                  </h6>
                  <Progress className={getQTY <= 2 ? 'danger-progress' : getQTY >= 3 && getQTY <= 7 ? 'warning-progress' : ''} striped animated value={getProgressValue(productState)} />
                </div>
              </div>
            ) : null
          ) : null}
          {productState?.product?.size_chart_image ||
            (themeOption?.product?.shipping_and_return && productState?.product?.is_return) ||
            (themeOption?.product?.shipping_and_return && productState?.product?.is_return) ? (
            <div className='size-delivery-info'>
              {productState?.product?.size_chart_image && (
                <a onClick={() => setModal('size')}>
                  <RiRulerLine />
                  {t('size_chart')}
                </a>
              )}
              {themeOption?.product?.shipping_and_return && productState?.product?.is_return ? (
                <a onClick={() => setModal('delivery')}>
                  <RiTruckLine /> {t('delivery_return')}
                </a>
              ) : null}
              {isLogin && themeOption?.product?.shipping_and_return && productState?.product?.is_return ? (
                <a onClick={() => setModal('qna')}>
                  <RiQuestionnaireLine /> {t('ask_a_question')}
                </a>
              ) : null}
            </div>
          ) : null}
          {modal && activeModal[modal]}
        </>
      }
    </>
  );
};

export default ProductStatus;
