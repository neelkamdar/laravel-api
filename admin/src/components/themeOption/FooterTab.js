import { useTranslation } from "react-i18next";
import { Col, Row } from 'reactstrap';
import { FooterUseFulLink, helpCenter } from '../../data/TabTitleList';
import CheckBoxField from '../inputFields/CheckBoxField';
import MultiSelectField from '../inputFields/MultiSelectField';
import SearchableSelectInput from '../inputFields/SearchableSelectInput';
import SimpleInputField from '../inputFields/SimpleInputField';
import FooterSubscribe from './FooterSubscribe';

const FooterTab = ({ values, setFieldValue, errors, categoryData }) => {

  const { t } = useTranslation('common');
  return (
    <>
      <Row>
        <Col sm="12">
          <SearchableSelectInput
            nameList={[
              {
                name: '[options][footer][footer_style]',
                title: 'footer_style',
                inputprops: {
                  name: '[options][footer][footer_style]',
                  id: '[options][footer][footer_style]',
                  options: [
                    { id: 'basic_footer', name: 'Basic Footer' },
                    { id: 'classic_footer', name: 'Classic Footer' },
                    { id: 'footer_subscribe', name: 'Footer Subscribe' },
                  ],
                  defaultOption: 'Select Footer Style',
                },
              },
            ]}
          />
          {values["options"]["footer"]?.["footer_style"] === "footer_subscribe" && <FooterSubscribe values={values} setFieldValue={setFieldValue} />}
          <SimpleInputField
            nameList={[
              { name: '[options][footer][footer_about]', type: 'textarea', title: 'footer_content', placeholder: t('enter_footer_content') },
              { name: '[options][footer][about_address]', type: 'textarea', title: 'address', placeholder: t('enter_address') },
              { name: '[options][footer][about_email]', title: 'email', placeholder: t('enter_email') }
            ]}
          />
          <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name='footer_categories' title={'footer_categories'} data={categoryData || []} />
          <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} title='useful_link' name='useful_link' data={FooterUseFulLink} helpertext="*Pick Usefull Link to showcase in the footer area." />
          <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name='help_center' title='Help Pages' data={helpCenter} helpertext="*Pick help center Link to showcase in the footer area." />
          <SimpleInputField
            nameList={[
              { name: '[options][footer][support_number]', title: 'support_number', placeholder: t('enter_support_number') },
              { name: '[options][footer][support_email]', title: 'support_email', placeholder: t('enter_support_email') },
              { name: '[options][footer][play_store_url]', title: 'play_store_url', placeholder: t('enter_play_store_url') },
              { name: '[options][footer][app_store_url]', title: 'app_store_url', placeholder: t('enter_app_store_url') },
            ]}
          />
          <CheckBoxField name='[options][footer][social_media_enable]' title='social_media_enable' />
          {values['options']?.['footer']?.['social_media_enable'] &&
            <SimpleInputField
              nameList={[
                { name: '[options][footer][facebook]', title: 'facebook', placeholder: t('enter_facebook_url') },
                { name: '[options][footer][instagram]', title: 'instagram', placeholder: t('enter_instagram_url') },
                { name: '[options][footer][twitter]', title: 'twitter', placeholder: t('enter_twitter_url') },
                { name: '[options][footer][pinterest]', title: 'pinterest', placeholder: t('enter_pinterest_url') },
              ]}
            />
          }
          <CheckBoxField name='[options][footer][footer_copyright]' title='footer_copyright' />
          {values?.['options']?.['footer']?.['footer_copyright'] && (
            <SimpleInputField nameList={[{ name: '[options][footer][copyright_content]', type: 'textarea', title: 'copyright_text', placeholder: t('enter_copyright_text') }]} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default FooterTab;
