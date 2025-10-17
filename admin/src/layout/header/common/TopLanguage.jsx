'use client';
import i18next from "i18next";
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import English from '../../../../public/assets/images/country/English.png';
import French from '../../../../public/assets/images/country/French.png';
import Spanish from '../../../../public/assets/images/country/Spanish.png';
import Arabic from '../../../../public/assets/images/country/arabic.png';
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axiosUtils";
import { AllLanguageApi } from "@/utils/axiosUtils/API";
import LanguageContext from "@/helper/languageContext";
import Cookies from "js-cookie";

const TopLanguage = () => {  
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage;
  const { setLocalLanguage } = useContext(LanguageContext);
  const  router = useRouter()

  const [selectedLang, setSelectedLang] = useState({ lang: currentLanguage,});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { data: languages } = useQuery({queryKey:["languages"], queryFn: () => request({ url: AllLanguageApi }), enabled: true, refetchOnWindowFocus: false, refetchOnMount: false, select: (res) => res.data.data });

  useEffect(() => {
    const defaultLanguage = languages?.find((lang) => lang.locale === currentLanguage);
    if (defaultLanguage) {
      setSelectedLang(defaultLanguage);
    }
  }, [languages, currentLanguage]);

  const handleChangeLang = (lang) => {
    setSelectedLang(lang);
    setLocalLanguage(lang.locale);
    i18n.changeLanguage(lang.locale);
    Cookies.set('i18next', lang.locale);
    router.refresh();
  };

  return (
    <Dropdown className='theme-form-select' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='select-dropdown' type='button' id='select-language'>
        {/* <div className={`iti-flag ${selectedLang.flag}`}></div> */}
        <span>{selectedLang.name}</span>
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu-end'>
        {languages?.map((elem, i) => {
          if (elem.locale === currentLanguage) {
            return null;
          }
          return(
            <a onClick={() => handleChangeLang(elem)} key={i} className={elem.locale === currentLanguage ? "active" : "" }>
              <DropdownItem id={elem.name}>
                {/* <div className={`iti-flag ${elem.flag}`}></div> */}
                <span>{elem.name}</span>
              </DropdownItem>
            </a>
          )
        }
        
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TopLanguage;
