"use client";
import AccountProvider from "@/helper/accountContext/AccountProvider";
import BlogProvider from "@/helper/blogContext/BlogProvider";
import BrandProvider from "@/helper/brandContext/BrandProvider";
import CartProvider from "@/helper/cartContext/CartProvider";
import CategoryProvider from "@/helper/categoryContext/CategoryProvider";
import CompareProvider from "@/helper/compareContext/CompareProvider";
import CurrencyProvider from "@/helper/currencyContext/CurrencyProvider";
import ProductProvider from "@/helper/productContext/ProductProvider";
import ProductIdsProvider from "@/helper/productIdsContext/ProductIdsProvider";
import SellerProvider from "@/helper/sellerContext/SellerProvider";
import SettingProvider from "@/helper/settingContext/SettingProvider";
import ThemeOptionProvider from "@/helper/themeOptionsContext/ThemeOptionProvider";
import WishlistProvider from "@/helper/wishlistContext/WishlistProvider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SubLayout from "./SubLayout";
import BrandIdsProvider from "@/helper/brandIdsContext/BrandIdsProvider";
import BlogIdsProvider from "@/helper/blogIdsContext/BlogIdsProvider";
import ZoneProvider from "@/helper/zoneContext/ZoneProvider";

const MainLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("version=1.0.0");
  }, []);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={children.dehydratedState}>
          <ZoneProvider>
            <ThemeOptionProvider>
              <AccountProvider>
                <SellerProvider>
                  <BrandProvider>
                    <BlogProvider>
                      <ProductIdsProvider>
                        <CompareProvider>
                          <CartProvider>
                            <WishlistProvider>
                              <CategoryProvider>
                                <ProductProvider>
                                  <SettingProvider>
                                    <CurrencyProvider>
                                      <BrandIdsProvider>
                                        <BlogIdsProvider>
                                          <SubLayout children={children} />
                                        </BlogIdsProvider>
                                      </BrandIdsProvider>
                                    </CurrencyProvider>
                                  </SettingProvider>
                                </ProductProvider>
                              </CategoryProvider>
                            </WishlistProvider>
                          </CartProvider>
                        </CompareProvider>
                      </ProductIdsProvider>
                    </BlogProvider>
                  </BrandProvider>
                </SellerProvider>
              </AccountProvider>
            </ThemeOptionProvider>
          </ZoneProvider>
        </HydrationBoundary>
      </QueryClientProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default MainLayout;
