import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { useContext } from 'react';
import { Col } from 'reactstrap';
import LiveImagePath  from '@/utils/constants';

const AboutUsText = () => {
  const { t } = useTranslation( 'common');
  const { themeOption } = useContext(ThemeOptionContext);

  return (
    <Col xl='6' xs='12'>
      <div className='fresh-contain p-center-left'>
        <div>
          <div className='review-title'>
            <h4>{themeOption?.about_us?.about?.sub_title}</h4>
            <h2>{themeOption?.about_us?.about?.title}</h2>
          </div>
          <div className='delivery-list'>
            <p className='text-content'>{themeOption?.about_us?.about?.description}</p>
            <ul className='delivery-box'>
              {themeOption?.about_us?.about?.futures.map((data, index) => (
                <li key={index}>
                  <div className='delivery-box'>
                    <div className='delivery-icon'>
                      {data?.icon &&<Image src={`${LiveImagePath}${data?.icon}`} alt='delivery' height={26.13} width={30} />}
                    </div>
                    <div className='delivery-detail'>
                      <h5 className='text'>{data?.title}</h5>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AboutUsText;
