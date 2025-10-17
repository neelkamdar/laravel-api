import ThemeOptionContext from "@/helper/themeOptionsContext";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import { footerColor } from "../../../data/LayoutData";
import paymentImage from '../../../../public/assets/images/payment/1.png';
import FooterLogo from "../common/FooterLogo";
import FooterAbout from "../common/FooterAbout";
import FooterCategory from "../common/FooterCategory";
import FooterLink from "../common/FooterLink";
import FooterContact from "../common/FooterContact";
import FooterSocial from "../common/FooterSocial";
import Image from "next/image";

const BasicFooter = () => {
    const { t } = useTranslation("common");
    const [footerMenu, setFooterMenu] = useState("");
    const { themeOption } = useContext(ThemeOptionContext);
    const pathname = usePathname();
    return (
        <div className="container-fluid-lg">
            <div className="main-footer section-b-space">
                <Row className="g-md-4 g-3">
                    <Col xl={3} lg={4} sm={6}>
                        <div className='footer-logo'>
                            <FooterLogo />
                            <FooterAbout />
                        </div>
                    </Col>
                    <Col xl={2} lg={3} md={4} sm={6}>
                        <div className={`footer-title ${footerMenu == 'category' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'category' ? 'category' : ''))}>
                            <h4>{t('categories')}</h4>
                        </div>

                        <div className='footer-contain'>
                            <FooterCategory />
                        </div>
                    </Col>
                    <Col xl={""} lg={2} sm={3}>
                        <div className={`footer-title ${footerMenu == 'usefull' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'usefull' ? 'usefull' : ''))}>
                            <h4>{t('useful_links')}</h4>
                        </div>
                        <div className='footer-contain'>
                            <FooterLink />
                        </div>
                    </Col>
                    <Col xl={2} sm={3}>
                        <div className={`footer-title ${footerMenu == 'pages' ? 'show' : ''}`} onClick={() => setFooterMenu((prev) => (prev !== 'pages' ? 'pages' : ''))}>
                            <h4>{t('help_center')}</h4>
                        </div>
                        <div className='footer-contain'>
                            <FooterLink useFull_Link={false} />
                        </div>
                    </Col>
                    <Col xl={3} lg={4} sm={6}>
                        {themeOption?.footer?.support_number || themeOption?.footer?.support_email || themeOption?.footer?.play_store_url || themeOption?.footer?.app_store_url ? (
                            <div className={`footer-title contact-title`}>
                                <h4>{t('contact_us')}</h4>
                            </div>
                        ) : ""}
                        <FooterContact />
                    </Col>
                </Row>
            </div >
            <div className='sub-footer section-small-space'>
                {themeOption?.footer?.footer_copyright && (
                    <div className='reserve'>
                        <h6 className='text-content'>{themeOption?.footer?.copyright_content}</h6>
                    </div>
                )}

                <div className='payment'>
                    {paymentImage && <Image src={paymentImage} alt='payment' height={35} width={302} />}
                </div>
                <FooterSocial />
            </div>
        </div >
    );
};

export default BasicFooter;
