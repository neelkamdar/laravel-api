import NoDataFound from '@/components/common/NoDataFound';
import BrandContext from '@/helper/brandContext';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { AccordionBody, Input, InputGroup, Label } from "reactstrap";

const CollectionBrand = ({ filter, setFilter }) => {
  const [category, attribute, price, rating, sortBy, field, layout, page] = useCustomSearchParams(['category', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout', "page"]);
  const { brandState , isLoading ,refetch } = useContext(BrandContext);
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);

  const [showList, setShowList] = useState();
  useEffect(() => {
    !isLoading && setShowList(brandState)
  }, [brandState ,isLoading])
  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    return valueToReturn
  }
  const handleChange = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const updatedData = []
      brandState?.forEach(item => { hasValue(item, keyword) && updatedData.push(item) })
      setShowList(updatedData)
    } else {
      setShowList(brandState)
    }
  }
  const redirectToCollection = (event, slug) => {
    event.preventDefault();
    let temp = [...filter?.brand];

    if (!temp.includes(slug)) {
      temp.push(slug);

    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        brand: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...page, brand: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...page }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <AccordionBody accordionId='2'>
      {brandState.length > 5 && (
        <div className="theme-form search-box">
          <Input
            type="search"
            className="form-control"
            placeholder="Search Text"
            onChange={handleChange}
          />
          <div className="search-icon">
            <RiSearchLine />
          </div>
        </div>
      )}
      {showList?.length > 0 ? (
        <ul className='category-list custom-padding custom-height'>
          {showList?.map((elem, i) => (
            <li key={i}>
              <div className='form-check category-list-box'>
                <Input className='checkbox_animated' type='checkbox' id={elem?.name} checked={filter?.brand?.includes(elem?.slug)} onChange={(e) => redirectToCollection(e, elem?.slug)} />
                <Label className='form-check-label' htmlFor={elem?.name}>
                  <span className='name'>{elem?.name}</span>
                </Label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'no_brand_found' }} />
      )}
    </AccordionBody>
  );
};

export default CollectionBrand;
