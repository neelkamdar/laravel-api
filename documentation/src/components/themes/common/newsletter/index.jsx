import { RiArrowRightLine, RiMailLine } from 'react-icons/ri';
import { Col, Container, Input, Row } from 'reactstrap';
import { Form, Formik, Field } from 'formik';
import { useTranslation } from "react-i18next";
import useCreate from '@/utils/hooks/useCreate';
import { SubscribeAPI } from '@/utils/axiosUtils/API';
import WrapperComponent from '@/components/common/WrapperComponent';
import Btn from '@/elements/buttons/Btn';
import { useState } from 'react';
import basketImage from "../../../../../public/assets/images/basket.png"
import Image from 'next/image';
import  LiveImagePath  from '@/utils/constants';

const NewsLetter = ({ dataAPI, style = 'basic' }) => {
  const { t } = useTranslation( 'common');
  const [errorOrder, setErrorOrder] = useState('');
  const { mutate, isLoading } = useCreate(SubscribeAPI, false, false, true, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
     ToastNotification("success", resDta?.data?.message)
    }else{
      setErrorOrder(resDta?.data?.message);
    }
  });
  return (
    <>
      {style == 'basic' &&
        <WrapperComponent classes={{ sectionClass: 'newsletter-section section-b-space' }} noRowCol={true}>
          <div className='newsletter-box newsletter-box-2' style={{ backgroundImage: `url(${LiveImagePath}${dataAPI?.image_url})` }}>
            <div className='newsletter-contain py-5'>
              <Container fluid={true}>
                <Row>
                  <Col lg={5} md={7} sm={9} xxl={4} className='offset-xxl-2 offset-md-1'>
                    <div className='newsletter-detail'>
                      <h2>{dataAPI?.title}</h2>
                      <h5>{dataAPI?.sub_title}</h5>
                      <Formik
                        initialValues={{ email: '' }}
                        onSubmit={(values, { resetForm }) => { mutate(values, { onSuccess: () => { resetForm(); }, }); }}
                      >
                        {({ values, errors, touched, setFieldValue }) => (
                          <Form>
                            <div className='input-box'>
                              <Field type='email' placeholder='Enter Your Email' name="email" />
                              <div className="mail-icon">
                                <RiMailLine />
                              </div>
                              <Btn className='sub-btn btn-animation'>
                                <span className='d-sm-block d-none'>{t('subscribe')}</span>
                                <RiArrowRightLine />
                              </Btn>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </WrapperComponent>
      }
      {style == 'classic' &&
        <WrapperComponent classes={{ sectionClass: 'newsletter-section newsletter-section-2 section-b-space' }} noRowCol={true}>
          <div className='newsletter-box hover-effect bg-size' style={{ backgroundImage: `url(${LiveImagePath}${dataAPI?.image_url})` }}>
            <div className='newsletter-contain'>
              <Container fluid={true}>
                <Row>
                  <Col xl={7} xxl={8} >
                    <div className='newsletter-detail p-center-left text-white'>
                      <div>
                        <h2>{dataAPI?.title}</h2>
                        <h4>{dataAPI?.sub_title}</h4>
                        <div className="row g-2">
                          <div className="col-sm-10 col-12"  >
                            <Formik
                              initialValues={{ email: '' }}
                              onSubmit={(values, { resetForm }) => { mutate(values, { onSuccess: () => { resetForm(); }, }); }}
                            >
                              {({ values, errors, touched, setFieldValue }) => (
                                <Form>
                                  <div className='newsletter-form'>
                                    <Field type='email' placeholder='Enter Your Email' name="email" />
                                    <div className="mail-icon">
                                      <RiMailLine />
                                    </div>
                                    <Btn className='bg-white btn btn-md fw-500 submit-button theme-color'>
                                      <span className='d-sm-block d-none'>{t('subscribe')}</span>
                                      <RiArrowRightLine />
                                    </Btn>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xxl={4} xl={5} className='d-xl-block d-none'>
                     <div className='shape-box'>
                          <Image src={basketImage} alt="basket" className="img-fluid image-1"/>
                     </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </WrapperComponent>
      }
    </>
  );
};

export default NewsLetter;