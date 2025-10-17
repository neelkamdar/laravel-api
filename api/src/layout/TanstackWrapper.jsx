"use client";
import { useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";
import SettingProvider from "@/helper/settingContext/SettingProvider";
import AccountProvider from "@/helper/accountContext/AccountProvider";
import BadgeProvider from "@/helper/badgeContext/BadgeProvider";
import CategoryProvider from "@/helper/categoryContext/CategoryProvider";
import CartProvider from "@/helper/cartContext/CartProvider";
import MenuProvider from "@/helper/menuContext/MenuProvider";
import { CookiesProvider } from "react-cookie";

const TanstackWrapper = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={children.dehydratedState}>
        <CookiesProvider defaultSetOptions>
          <SettingProvider>
            <AccountProvider>
              <BadgeProvider>
                <CategoryProvider>
                  <CartProvider>
                    <MenuProvider>{children}</MenuProvider>
                  </CartProvider>
                </CategoryProvider>
              </BadgeProvider>
            </AccountProvider>
          </SettingProvider>
        </CookiesProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default TanstackWrapper;
