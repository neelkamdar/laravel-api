import { usePathname, useRouter } from 'next/navigation';
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from 'reactstrap';
import { filterPrice } from '../../../data/CustomData';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { useTranslation } from "react-i18next";

const CollectionPrice = ({ filter, setFilter, attributeAPIData }) => {
  const router = useRouter();
  const [category, attribute, sortBy, field, rating, layout ,page] = useCustomSearchParams(['category', 'attribute', 'sortBy', 'field', 'rating', 'layout',"page"]);
  const { t } = useTranslation( 'common');
  const pathname = usePathname();
  const checkPrice = (value) => {
    if (filter?.price?.indexOf(value) != -1) {
      return true;
    } else return false;
  };
  const applyPrice = (event) => {
    const index = filter?.price.indexOf(event?.target?.value);
    let temp = [...filter?.price];
    if (event.target.checked) {
      temp.push(event?.target?.value);
    } else {
      temp.splice(index, 1);
    }
    setFilter((prev) => {
      return {
        ...prev,
        price: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout, ...page, price: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout ,...page }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionItem>
      <AccordionHeader targetId={(attributeAPIData?.length + 2).toString()}>
        <span>{t('price')}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 2).toString()}>
        <ul className='category-list custom-padding custom-height'>
          {filterPrice.map((price, i) => (
            <li key={i}>
              <div className='form-check category-list-box'>
                <Input className='checkbox_animated' type='checkbox' id={`price-${price.id}`} value={price?.value} checked={checkPrice(price?.value)} onChange={applyPrice} />
                <Label className='form-check-label' htmlFor={`price-${price.id}`}>
                  {price?.price ? (
                    <span className='name'>
                      {price.text} ${price.price}
                    </span>
                  ) : (
                    <span className='name'>
                      ${price.minPrice} - ${price.maxPrice}
                    </span>
                  )}
                </Label>
              </div>
            </li>
          ))}
        </ul>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionPrice;
