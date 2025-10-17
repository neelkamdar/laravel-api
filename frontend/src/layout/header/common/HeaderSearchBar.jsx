import Btn from "@/elements/buttons/Btn";
import ProductContext from "@/helper/productContext";
import request from "@/utils/axiosUtils";
import { CategoryAPI } from "@/utils/axiosUtils/API";
import useMobileSize from "@/utils/hooks/customHooks/useMobileSize";
import useOutsideDropdown from "@/utils/hooks/customHooks/useOutsideDropdown";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import CategoryDropdown from "./CategoryDropdown";
import SearchDropDown from "./SearchDropDown";

const HeaderSearchBar = ({ ResponsiveSearch, searchBarOpen, setSearchBarOpen, style, ClassicHeader }) => {
  const mobileSize = useMobileSize();
  const { searchList } = useContext(ProductContext);
  const { t } = useTranslation("common");
  const [searchArr, setSearchArray] = useState([]);
  const pathName = usePathname();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  const [selectedValue, setSelectedValue] = useState("");
  const [paginate, setPaginate] = useState(4);
  const [categorySearch, setCategorySearch] = useState(false);
  const [categoryCustomSearch, setCategoryCustomSearch] = useState("");
  const [categoryTc, setCategoryTc] = useState(null);

  const { data: categoryData, refetch, isLoading: categoryIsLoading } = useQuery({queryKey: ["CategoryAPIBaiscSearch"], queryFn: () => request({ url: CategoryAPI, params: { status: 1, paginate: selectedValue === "All Category" ? 4 : paginate, ids: selectedValue ? (selectedValue === "All Category" ? null : selectedValue) : null, search: categoryCustomSearch ? categoryCustomSearch : null } }, router), enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data });

  useEffect(() => {
    if (selectedValue === "" && categoryIsLoading) {
      categoryIsLoading && refetch();
    } else if (selectedValue !== "" && !categoryIsLoading) {
      setPaginate(null);
      refetch();
    }
  }, [categoryIsLoading, selectedValue]);
  // Added debouncing
  useEffect(() => {
    if (categoryTc) clearTimeout(categoryTc);
    setCategoryTc(setTimeout(() => setCategoryCustomSearch(categorySearch), 500));
  }, [categorySearch]);
  // Getting users data on searching users
  useEffect(() => {
    !categoryIsLoading && categoryCustomSearch !== undefined && refetch();
  }, [categoryCustomSearch]);
  const router = useRouter();
  useEffect(() => {
    setSelectedItemIndex(null);
    setIsComponentVisible(false), setSearchValue("");
    setSearchArray(searchList?.slice(0, 5));
  }, [pathName]);

  const onHandleSearch = () => {
    if (searchValue) {
      router.push(`/search?search=${searchValue}`);
    } else {
      router.push(`/search`);
    }
  };
  const onChangeHandle = (text) => {
    setSearchValue(text);
    setCategorySearch(text);
    if (text !== "") {
      const search = searchList.filter((item) => item?.title?.toLowerCase().includes(text.toLowerCase()));
      setSearchArray(search);
      setIsComponentVisible(true);
    } else {
      setSearchArray([]);
      setIsComponentVisible(false);
    }
  };
  const handleEnterKey = () => {
    if (selectedItemIndex !== null) {
      const selectedItem = searchArr[selectedItemIndex];
      router.push(`/product/${selectedItem.slug}`);
    }
  };

  const handleArrowKey = (direction) => {
    if (searchArr.length > 0) {
      let newIndex = selectedItemIndex === null ? 0 : selectedItemIndex + direction;
      if (newIndex < 0) {
        newIndex = searchArr.length - 1;
      } else if (newIndex >= searchArr.length) {
        newIndex = 0;
      }
      const selectedItemElement = document.getElementById(`searchItem_${newIndex}`);
      if (selectedItemElement) {
        selectedItemElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setSearchValue(searchArr[newIndex]?.title);
      setSelectedItemIndex(newIndex);
    }
  };

  return (
    <>
      {mobileSize && ResponsiveSearch ? (
        <div className={`search-full ${searchBarOpen ? "open" : ""} `}>
          <InputGroup>
            <InputGroupText>
              <RiSearchLine className="font-light" />
            </InputGroupText>
            {/* <Input type='text' className='form-control search-type' placeholder='Search here..' /> */}
            <Input
              onClick={() => {
                setIsComponentVisible(true);
                setSearchArray(searchList?.slice(0, 5));
              }}
              type="search"
              className="search-type"
              placeholder="Search..."
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  handleArrowKey(1);
                } else if (e.key === "ArrowUp") {
                  handleArrowKey(-1);
                } else if (e.key === "Enter") {
                  handleEnterKey();
                }
              }}
              onChange={(e) => onChangeHandle(e.target.value)}
            />
            <InputGroupText className="close-search">
              <RiCloseLine
                className="font-light"
                onClick={() => {
                  setSearchBarOpen && setSearchBarOpen((prev) => !prev);
                }}
              />
            </InputGroupText>
            {isComponentVisible && <SearchDropDown ref={ref} selectedItemIndex={selectedItemIndex} searchArr={searchArr} categoryLoading={categoryIsLoading} categoryData={categoryData} searchValue={searchValue} />}
          </InputGroup>
        </div>
      ) : null}
      {ClassicHeader && ResponsiveSearch ? (
        <div className={`search-full ${searchBarOpen ? "open" : ""} `}>
          <InputGroup>
            <InputGroupText>
              <RiSearchLine className="font-light" />
            </InputGroupText>
            {/* <Input type='text' className='form-control search-type' placeholder='Search here..' /> */}
            <Input
              onClick={() => {
                setIsComponentVisible(true);
                setSearchArray(searchList?.slice(0, 5));
              }}
              type="search"
              className="search-type"
              placeholder="Search..."
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  handleArrowKey(1);
                } else if (e.key === "ArrowUp") {
                  handleArrowKey(-1);
                } else if (e.key === "Enter") {
                  handleEnterKey();
                }
              }}
              onChange={(e) => onChangeHandle(e.target.value)}
            />
            <InputGroupText className="close-search">
              <RiCloseLine
                className="font-light"
                onClick={() => {
                  setSearchBarOpen && setSearchBarOpen((prev) => !prev);
                }}
              />
            </InputGroupText>
            {isComponentVisible && <SearchDropDown ref={ref} selectedItemIndex={selectedItemIndex} searchArr={searchArr} categoryLoading={categoryIsLoading} categoryData={categoryData} searchValue={searchValue} />}
          </InputGroup>
        </div>
      ) : null}
      {!mobileSize && style == "standard" ? (
        <div className="middle-box">
          <div className="center-box">
            <div className="searchbar-box order-xl-1 d-none d-xl-block">
              <Input
                onClick={() => {
                  setIsComponentVisible(true);
                  setSearchArray(searchList?.slice(0, 5));
                }}
                type="search"
                placeholder="Search..."
                value={searchValue}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    handleArrowKey(1);
                  } else if (e.key === "ArrowUp") {
                    handleArrowKey(-1);
                  } else if (e.key === "Enter") {
                    handleEnterKey();
                  }
                }}
                onChange={(e) => onChangeHandle(e.target.value)}
              />
              {isComponentVisible && <SearchDropDown ref={ref} selectedItemIndex={selectedItemIndex} searchArr={searchArr} categoryLoading={categoryIsLoading} categoryData={categoryData} searchValue={searchValue} />}
              <Btn className="btn search-button" onClick={onHandleSearch}>
                <RiSearchLine />
              </Btn>
            </div>
          </div>
        </div>
      ) : null}
      {!mobileSize && style == "minimal" ? (
        <div className="middle-box">
          <div className="center-box">
            <div className="searchbar-box-2 input-group d-xl-flex d-none">
              <Btn className="btn search-icon" type="button">
                <RiSearchLine />
              </Btn>
              <Input
                onClick={() => {
                  setIsComponentVisible(true);
                  setSearchArray(searchList?.slice(0, 5));
                }}
                type="search"
                placeholder="Search..."
                value={searchValue}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    handleArrowKey(1);
                  } else if (e.key === "ArrowUp") {
                    handleArrowKey(-1);
                  } else if (e.key === "Enter") {
                    handleEnterKey();
                  }
                }}
                onChange={(e) => onChangeHandle(e.target.value)}
              />
              <Btn className="btn search-button" type="button" onClick={onHandleSearch}>
                {t("search")}
              </Btn>
              {isComponentVisible && <SearchDropDown ref={ref} selectedItemIndex={selectedItemIndex} searchArr={searchArr} categoryLoading={categoryIsLoading} categoryData={categoryData} searchValue={searchValue} />}
            </div>
          </div>
        </div>
      ) : null}
      {!mobileSize && style == "basic" ? (
        <div className="middle-box custom-search-box">
          <div className="search-box">
            <div className="input-group">
              <div className="location-box">
                <CategoryDropdown setPaginate={setPaginate} categoryData={categoryData} selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
              </div>
              <div className="search-suggestion-wrap">
                <Input
                  onClick={() => {
                    setIsComponentVisible(true);
                    setSearchArray(searchList?.slice(0, 5));
                  }}
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                  value={searchValue}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      handleArrowKey(1);
                    } else if (e.key === "ArrowUp") {
                      handleArrowKey(-1);
                    } else if (e.key === "Enter") {
                      handleEnterKey();
                    }
                  }}
                  onChange={(e) => onChangeHandle(e.target.value)}
                />
                <Btn className="btn search-button" type="button" id="button-addon2" onClick={onHandleSearch}>
                  <RiSearchLine />
                </Btn>
                {isComponentVisible && <SearchDropDown ref={ref} selectedItemIndex={selectedItemIndex} searchArr={searchArr} categoryLoading={categoryIsLoading} categoryData={categoryData} searchValue={searchValue} />}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeaderSearchBar;
