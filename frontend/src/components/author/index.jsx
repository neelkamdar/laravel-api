import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useEffect, useState } from "react";
import CollectionLeftSidebar from "../collection/collectionLeftSidebar";
import Breadcrumb from "../common/Breadcrumb";
import CollectionNoSidebar from "../collection/collectionNoSidebar";
import { useQuery } from "@tanstack/react-query";
import { AuthorAPI } from "@/utils/axiosUtils/API";
import request from "@/utils/axiosUtils";
import { useRouter } from "next/navigation";
import WrapperComponent from "../common/WrapperComponent";
import MainCollection from "../collection/mainCollection";
import Image from "next/image";
import { RiFacebookFill, RiGlobalLine, RiInstagramFill, RiPinterestFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { dateFormat } from "@/utils/customFunctions/DateFormat";
import OfferBanner from "../parisTheme/OfferBanner";

const AuthorMainPage = ({ slug }) => {
    const router = useRouter();
    const { t } = useTranslation( 'common');

    const [filter, setFilter] = useState({ category: [], brand: [], price: [], attribute: [], rating: [], page: 1, sortBy: 'asc', field: 'created_at' });
    const [category, brand, attribute, price, rating, sortBy, field, layout, page] = useCustomSearchParams(['category', 'brand', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout', 'page']);
    const { data: author, isLoading, refetch } = useQuery({queryKey: [AuthorAPI], queryFn: () => request({ url: `${AuthorAPI}/slug/${slug}` }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
    useEffect(() => {
        if (isLoading) {
            refetch();
        }
    }, [isLoading]);

    useEffect(() => {
        setFilter((prev) => {
            return {
                ...prev,
                page: page ? page?.page : 1,
                category: category ? category?.category?.split(',') : [],
                brand: brand ? brand?.brand?.split(',') : [],
                attribute: attribute ? attribute?.attribute?.split(',') : [],
                price: price ? price?.price?.split(',') : [],
                rating: rating ? rating?.rating?.split(',') : [],
                sortBy: sortBy ? sortBy?.sortBy : 'asc',
                field: field ? field?.field : 'created_at',
            }; 
        });
    }, [category, brand, attribute, price, rating, sortBy, field, page]);
    return <>
        <Breadcrumb title={`Author: ${slug}`} subNavigation={[{ name: slug }]} />
        <section className="author-section section-t-space">
            <div className="container-fluid-lg">
                <div className="author-main-box">
                    <div className="cover-image">
                        {author?.author_cover_image?.original_url ? 
                            <img src={author?.author_cover_image?.original_url} height={1493} width={310} alt='author__cover_image' /> :
                            <img src={'/assets/images/author_placeholder.png'} alt='author__cover_image' className="img-fluid" /> 
                        }
                    </div>
                    <div className="author-box">
                        <Image className="img-fluid author-image" src={author?.author_image?.original_url} height={248} width={248} alt='author_image' />
                        <div className="right-side-box">
                            <div>
                                <div className="author-name">
                                    <h4>{author?.author_name}</h4>
                                    <p>{author?.bio}</p>
                                </div>
                                <div className="author-bottom-box">
                                    <div>
                                        <h5>{t("author_details")}:</h5>
                                        <ul className="country-list">
                                            <li>
                                                <span>{t("country")} : </span> {author?.country.name}
                                            </li>
                                            <li>
                                                <span>{t("state")} : </span> {author?.state.name}
                                            </li>
                                            <li>
                                                <span>{t("city")} : </span> {author?.city}
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="country-list">
                                            {author?.birth_date && <li>
                                                <span>{t("born_date")} : </span> {dateFormat(author?.birth_date)}
                                            </li>}
                                            {author?.death_date && <li>
                                                <span>{t("death_date")} : </span> {dateFormat(author?.death_date)}
                                            </li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="social-list-box">
                                <h5>{t("social_links")}:</h5>
                                    <ul className="social-list">
                                        {author?.language && 
                                        <li>
                                            <Link href={author?.language} target="_blank" className="language">
                                                <RiGlobalLine />
                                            </Link>
                                        </li>}
                                        {
                                            author?.facebook && 
                                            <li>
                                                <Link href={author?.facebook} target="_blank" className="fb">
                                                    <RiFacebookFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            author?.instagram && 
                                            <li>
                                                <Link href={author?.instagram} target="_blank" className="insta">
                                                    <RiInstagramFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            author?.twitter && 
                                            <li>
                                                <Link href={author?.twitter} target="_blank" className="twitter">
                                                    <RiTwitterXFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            author?.youtube && 
                                            <li>
                                                <Link href={author?.youtube} target="_blank" className="youtube">
                                                    <RiYoutubeFill />
                                                </Link>
                                            </li>
                                        }
                                        {
                                            author?.pinterest && 
                                            <li>
                                                <Link href={author?.pinterest} target="_blank" className="pinterest">
                                                    <RiPinterestFill />
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
 
        <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
            <MainCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} authorSlug={slug} />
        </WrapperComponent>
    </>;
};

export default AuthorMainPage;
