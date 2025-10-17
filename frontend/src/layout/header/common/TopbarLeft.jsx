import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Col } from 'reactstrap';

const TopbarLeft = ({themeOption}) => {
  const { t } = useTranslation('common');
  return (
    <Col xxl={3} className='d-xxl-block d-none'>
      <div className='top-left-header'>
        {themeOption.general.seller_register_url &&
        <>
         <Link className="text-white" href={themeOption?.general?.seller_register_url} target="_blank">
         <span className="text-white">{t('become_seller')}</span>
         </Link>
         </>
        }
      </div>
    </Col>
  );
};

export default TopbarLeft;
