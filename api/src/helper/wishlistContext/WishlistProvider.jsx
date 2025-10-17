import request from "@/utils/axiosUtils";
import { WishlistAPI } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import useDelete from "@/utils/hooks/useDelete";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartContext from ".";

const WishlistProvider = (props) => {
  const router = useRouter();
  const isCookie = Cookies.get("uaf");
  const [wishlistProducts, setWishlistProducts] = useState([]);

  // Getting data from Wishlist API
  const { data: WishlistApiData, isLoading: WishlistAPILoading, refetch } = useQuery({queryKey: [WishlistAPI], queryFn: () => request({ url: WishlistAPI }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });

  // Adding data to Wishlist API
  const { mutate, isLoading } = useCreate(WishlistAPI, false, false, "Added to Wishlist List");

  // Delete Cart API Data
  const { mutate: deleteWishlist, isLoading: deleteWishlistLoader } = useDelete(WishlistAPI, false, false, "Product Deleted from Wishlist");

  // Refetching Cart API
  useEffect(() => {
    if (isCookie && !deleteWishlistLoader) {
      refetch();
    }
  }, [deleteWishlistLoader, isCookie]);

  // Remove and Delete cart data from API and State
  const removeWishlist = (id, wishId) => {
    // const updatedWishlist = wishlistProducts?.filter((item) => item.product_id !== id);
    // setWishlistProducts(updatedWishlist);
    if (isCookie && wishId) {
      let id = typeof wishId == "object" ? wishId.id : wishId;
      deleteWishlist(id);
    }
  };

  useEffect(() => {
    if (isCookie) {
      if (WishlistApiData) {
        setWishlistProducts(WishlistApiData.data);
      }
    }
  }, [WishlistAPILoading, isCookie, WishlistApiData]);

  const [category, brand, attribute, price, rating, sortBy, field, layout, theme] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout", "theme"]);
  const pathname = usePathname();
  // Common Handler for Add to wishlist
  const addToWishlist = (productObj) => {
    if (Cookies.get("uaf")) {
      mutate({ product_id: productObj?.id },
        {
          onSuccess: () => {
            refetch(); // Refetch the wishlist after adding the product
          },
          onError: (error) => {
            console.error("Error adding to wishlist:", error);
          },
        }
      );
    } else {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category, ...theme }).toString();
      const sendPath = `${pathname}?${queryParams}`;
      Cookies.set("wishListID", productObj.product_id);
      Cookies.set("CallBackUrl", sendPath);
      router.push(`/auth/login`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        wishlistProducts,
        WishlistAPILoading,
        setWishlistProducts,
        removeWishlist,
        refetch,
        isLoading,
        addToWishlist,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default WishlistProvider;
