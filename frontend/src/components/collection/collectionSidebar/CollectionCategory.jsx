import NoDataFound from "@/components/common/NoDataFound";
import CategoryContext from "@/helper/categoryContext";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AccordionBody, Input, InputGroup, Label } from "reactstrap";

const CollectionCategory = ({ filter, setFilter }) => {
  const [brand, attribute, price, rating, sortBy, field, layout, page] = useCustomSearchParams(["brand", "attribute", "price", "rating", "sortBy", "field", "layout", "page"]);
  const { categoryAPIData, filterCategory } = useContext(CategoryContext);
  const [showList, setShowList] = useState(filterCategory("product"));
  useEffect(() => {
    const test = categoryAPIData?.data?.filter((elem) => elem.type === "product")
    setShowList(test)

  }, [categoryAPIData])

  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    item["subcategories"]?.length && item["subcategories"].forEach((child) => {
      if (hasValue(child, term)) {
        valueToReturn = true
      }
    })
    return valueToReturn
  }
  const handleChange = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const updatedData = []
      filterCategory("product")?.forEach(item => { hasValue(item, keyword) && updatedData.push(item) })
      setShowList(updatedData)
    } else {
      setShowList(filterCategory("product"))
    }
  }
  const redirectToCollection = (event, slug) => {
    event.preventDefault();
    let temp = [...filter?.category];

    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...page, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...page }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <>
      <AccordionBody accordionId="1">
        {filterCategory("product").length > 5 && (
          <div className="theme-form search-box">
            <Input
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
          <ul className="category-list custom-padding custom-height">
            <RecursiveCategory redirectToCollection={redirectToCollection} categories={showList} filter={filter} />
          </ul>
        ) : (
          <NoDataFound
            data={{
              customClass: "bg-light no-data-added",
              title: "no_category_found",
            }}
          />
        )}
      </AccordionBody>
    </>
  );
};

export default CollectionCategory;

const RecursiveCategory = ({ redirectToCollection, categories, filter }) => (
  <>
    {categories.map((elem, index) => (
      <Fragment key={index}>
        <li>
          <div className="form-check category-list-box">
            <Input
              className="checkbox_animated"
              type="checkbox"
              id={elem?.name}
              checked={filter?.category?.includes(elem?.slug)}
              onChange={(e) => redirectToCollection(e, elem?.slug)}
            />
            <Label className="form-check-label" htmlFor={elem?.name}>
              <span className="name">{elem?.name}</span>
            </Label>
          </div>
          {elem.subcategories.length > 0 ? (
            <ul className="sub-category-list">
              <RecursiveCategory redirectToCollection={redirectToCollection} categories={elem?.subcategories} filter={filter} />
            </ul>
          ) : null}
        </li>
      </Fragment>
    ))}
  </>
);
