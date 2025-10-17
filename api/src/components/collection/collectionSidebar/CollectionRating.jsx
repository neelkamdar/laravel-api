import React from 'react';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from 'next/navigation';
import { AccordionBody, AccordionHeader, AccordionItem, Input } from 'reactstrap';
import ProductRating from '@/components/common/productBox/widgets/ProductRating';

const CollectionRating = ({ filter, setFilter, attributeAPIData }) => {
  const RatingNumber = Array.from({ length: 5 }, (_, i) => i + 1).reverse();
  const router = useRouter();
  const [category, attribute, price, sortBy, field, layout ,page] = useCustomSearchParams(['category', 'attribute', 'price', 'sortBy', 'field', 'layout' ,'page']);
  
  const { t } = useTranslation( 'common');
  const pathname = usePathname();
  const checkRating = (value) => {
    if (filter?.rating?.indexOf(value) != -1) {
      return true;
    } else return false;
  };
  const applyRating = (event) => {
    const index = filter?.rating.indexOf(event?.target?.value);
    let temp = [...filter?.rating];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        rating: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...layout,...page, rating: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...layout ,...page }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId={(attributeAPIData?.length + 3).toString()}>
        <span>{t('rating')}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 3).toString()}>
        <ul className='category-list custom-padding'>
          {RatingNumber.map((elem, i) => (
            <li key={i}>
              <div className='form-check m-0 category-list-box'>
                <Input className='checkbox_animated' type='checkbox' value={elem} checked={checkRating(elem.toString())} onChange={applyRating} />
                <div className='form-check-label'>
                  <ProductRating totalRating={elem} />
                  <span className='text-content'>
                    ({elem} {t('star')})
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionRating;
