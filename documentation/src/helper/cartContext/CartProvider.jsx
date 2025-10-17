import request from "@/utils/axiosUtils";
import {
  AddToCartAPI,
  ClearCart,
  ReplaceCartAPI,
} from "@/utils/axiosUtils/API";
import { ToastNotification } from "@/utils/customFunctions/ToastNotification";
import useCreate from "@/utils/hooks/useCreate";
import useDelete from "@/utils/hooks/useDelete";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import CartContext from ".";
import SettingContext from "../settingContext";

const CartProvider = (props) => {
  const router = useRouter();
  const isCookie = Cookies.get("uaf");
  const [cartProducts, setCartProducts] = useState([]);
  const [variationModal, setVariationModal] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [cartToggle, setCartToggle] = useState(false);

  // const cookies = useCookies();
  // Getting data from Cart API
  // const { data: CartAPIData, isLoading: getCartLoading, refetch } = useQuery({queryKey: [AddToCartAPI], queryFn: () => request({ url: AddToCartAPI }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  const {
    data: CartAPIData,
    isLoading: getCartLoading,
    refetch,
  } = useQuery({
    queryKey: [AddToCartAPI],
    queryFn: () => request({ url: AddToCartAPI }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: useCallback((res) => {
      // This avoids new object reference creation every render
      return {
        items: res?.data?.items ?? [],
        total: res?.data?.total ?? 0,
      };
    }, []),
  });

  // Adding data to Cart API
  const {
    data: addData,
    mutate,
    isLoading,
  } = useCreate(AddToCartAPI, false, false, "No", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      setCartProducts((prevCart) =>
        prevCart?.map((elem) => {
          if (elem?.product_id == resDta?.data?.items[0]?.product_id) {
            return resDta?.data?.items[0];
          } else return elem;
        })
      );
    }
  });
  // Delete Cart API Data
  const { mutate: deleteCart, isLoading: deleteCartLoader } = useDelete(
    AddToCartAPI,
    false
  );

  // Replace Cart API
  const { mutate: replaceCartMutate, isLoading: replaceCartLoader } = useCreate(
    ReplaceCartAPI,
    false,
    false,
    "No"
  );

  //Clear Cart API
  const { mutate: ClearCartData, isLoading: clearCartLoader } = useMutation({
    mutationFn: () => request({ url: ClearCart, method: "delete" }),
    onSuccess: (responseData, requestData) => {
      if (responseData.status === 200 || responseData.status === 201) {
        ToastNotification("success", responseData.data.message);
      } else {
        ToastNotification("error", responseData?.data?.message);
      }
    },
  });

  // Refetching Cart API
  useEffect(() => {
    if (isCookie && !deleteCartLoader) {
      refetch();
    }
  }, [deleteCartLoader, isCookie]);

  // Setting CartAPI data to state and LocalStorage
  useEffect(() => {
    if (isCookie) {
      if (CartAPIData) {
        setCartProducts(CartAPIData?.items);
        setCartTotal(CartAPIData?.total);
      }
    } else {
      const isCartAvailable = JSON.parse(localStorage.getItem("cart"));
      if (isCartAvailable?.items?.length > 0) {
        setCartProducts(isCartAvailable?.items);
        setCartTotal(isCartAvailable?.total);
      }
    }
  }, [getCartLoading, isCookie, CartAPIData]);

  // Adding data in localstorage when not Login
  useEffect(() => {
    storeInCookies();
    if (isCookie == undefined) {
      storeInCookies();
      storeInLocalStorage();
    }
  }, [cartProducts, isLoading]);

  // Getting total
  const total = useMemo(() => {
    return cartProducts?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  }, [getCartLoading, cartProducts, deleteCartLoader]);

  // Total Function for child components
  const getTotal = (value) => {
    return value?.reduce((prev, curr) => {
      return prev + Number(curr.sub_total);
    }, 0);
  };

  const clearCartProduct = () => {
    setCartProducts([]);
    if (isCookie) {
      ClearCartData();
    }
  };

  // Remove and Delete cart data from API and State
  const removeCart = (id, cartId) => {
    const updatedCart = cartProducts?.filter((item) => item.product_id !== id);
    setCartProducts(updatedCart);
    if (isCookie && cartId) {
      let id = typeof cartId == "object" ? cartId.id : cartId;
      deleteCart(id);
    }
  };
  // setting the Cart Id in Cart Object
  const getValue = useCallback(
    (productObj) => {
      return addData?.data?.items?.find(
        (elem) => elem.product_id == productObj?.id
      );
    },
    [getCartLoading, cartProducts, addData?.data?.items]
  );
  // Common Handler for Increment and Decrement
  const handleIncDec = (
    qty,
    productObj,
    isProductQty,
    setIsProductQty,
    isOpenFun,
    cloneVariation
  ) => {
    const cartUid = getValue(productObj);
    const updatedQty = isProductQty ? isProductQty : 0 + qty;
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    let tempProductId = productObj?.id;
    let tempVariantProductId = cloneVariation?.selectedVariation?.product_id;

    // Checking conditions for Replace Cart
    if (
      cart[index]?.variation &&
      cloneVariation?.variation_id &&
      tempProductId == tempVariantProductId &&
      cloneVariation?.variation_id !== cart[index]?.variation_id
    ) {
      return replaceCart(updatedQty, productObj, cloneVariation);
    }

    // } else if (index === -1) {
    // Add data when not presence in Cart variable
    if (index === -1) {
      const params = {
        id: cartUid?.id ? cartUid?.id : null,
        product: productObj,
        product_id: productObj?.id,
        variation: cloneVariation?.selectedVariation
          ? cloneVariation?.selectedVariation
          : null,
        variation_id: cloneVariation?.selectedVariation?.id
          ? cloneVariation?.selectedVariation?.id
          : null,
        quantity: cloneVariation?.selectedVariation?.productQty
          ? cloneVariation?.selectedVariation?.productQty
          : updatedQty,
        sub_total: cloneVariation?.selectedVariation?.sale_price
          ? updatedQty * cloneVariation?.selectedVariation?.sale_price
          : updatedQty * productObj?.sale_price,
      };
      isCookie
        ? !isLoading && setCartProducts((prev) => [...prev, params])
        : setCartProducts((prev) => [...prev, params]);
    } else {
      // Checking the Stock QTY of particular product
      const productStockQty = cart[index]?.variation?.quantity
        ? cart[index]?.variation?.quantity
        : cart[index]?.product?.quantity;
      if (productStockQty < cart[index]?.quantity + qty) {
        ToastNotification(
          "error",
          `You can not add more items than available. In stock ${productStockQty} items.`
        );
        return false;
      }

      if (cart[index]?.variation) {
        cart[index].variation.selected_variation = cart[
          index
        ]?.variation?.attribute_values
          ?.map((values) => values.value)
          .join("/");
      }

      const newQuantity = cart[index].quantity + qty;
      if (newQuantity < 1) {
        // Remove the item from the cart if the new quantity is less than 1
        return removeCart(productObj?.id, cartUid ? cartUid : cart[index].id);
      } else {
        cart[index] = {
          ...cart[index],
          id: cartUid?.id
            ? cartUid?.id
            : cart[index].id
            ? cart[index].id
            : null,
          quantity: newQuantity,
          sub_total:
            newQuantity *
            (cart[index]?.variation
              ? cart[index]?.variation?.sale_price
              : cart[index]?.product?.sale_price),
        };
        isCookie
          ? !isLoading && setCartProducts([...cart])
          : setCartProducts([...cart]);
      }
    }

    // Update the productQty state immediately after updating the cartProducts state
    if (isCookie) {
      setIsProductQty && !isLoading && setIsProductQty(updatedQty);
      isOpenFun && !isLoading && isOpenFun(true);
    } else {
      setIsProductQty && setIsProductQty(updatedQty);
      isOpenFun && isOpenFun(true);
    }

    // Sending Current Object to cart
    const obj = {
      id: cartUid?.id ? cartUid?.id : null,
      product_id: productObj?.id,
      variation_id: cloneVariation?.selectedVariation?.id
        ? cloneVariation?.selectedVariation?.id
        : cart[index]?.variation_id
        ? cart[index]?.variation_id
        : null,
      quantity: qty,
    };
    if (isCookie && !isLoading) {
      if (index !== -1) {
        obj._method = "PUT";
      }
      mutate(obj);
    }
  };

  //Toggle open
  const cartToggleValue = (value) => {
    setCartToggle(value);
  };

  // Replace Cart
  const replaceCart = (updatedQty, productObj, cloneVariation) => {
    const cartUid = getValue(productObj);
    const cart = [...cartProducts];
    const index = cart.findIndex((item) => item.product_id === productObj?.id);
    cart[index].quantity = 0;

    const productQty = cart[index]?.variation
      ? cart[index]?.variation?.quantity
      : cart[index]?.product?.quantity;

    if (cart[index]?.variation) {
      cart[index].variation.selected_variation = cart[
        index
      ]?.variation?.attribute_values
        ?.map((values) => values.value)
        .join("/");
    }

    // Checking the Stock QTY of paricular product
    if (productQty < cart[index]?.quantity + updatedQty) {
      ToastNotification(
        "error",
        `You can not add more items than available. In stock ${productQty} items.`
      );
      return false;
    }

    const params = {
      id: cartUid?.id ? cartUid?.id : null,
      product: productObj,
      product_id: productObj?.id,
      variation: cloneVariation?.selectedVariation
        ? cloneVariation?.selectedVariation
        : null,
      variation_id: cloneVariation?.selectedVariation?.id
        ? cloneVariation?.selectedVariation?.id
        : null,
      quantity: cloneVariation?.productQty
        ? cloneVariation?.productQty
        : updatedQty,
      sub_total: cloneVariation?.selectedVariation?.sale_price
        ? updatedQty * cloneVariation?.selectedVariation?.sale_price
        : updatedQty * productObj?.sale_price,
    };

    isCookie
      ? !isLoading &&
        setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (
              elem?.product_id === cloneVariation?.selectedVariation?.product_id
            ) {
              return params;
            } else {
              return elem;
            }
          })
        )
      : setCartProducts((prevCartProducts) =>
          prevCartProducts.map((elem) => {
            if (
              elem?.product_id === cloneVariation?.selectedVariation?.product_id
            ) {
              return params;
            } else {
              return elem;
            }
          })
        );
    if (isCookie && !replaceCartLoader) {
      replaceCartMutate({
        _method: "PUT",
        id: cartUid?.id ? cartUid?.id : null,
        product_id: productObj?.id,
        variation_id: cloneVariation?.selectedVariation?.id
          ? cloneVariation?.selectedVariation?.id
          : null,
        quantity: cloneVariation?.productQty
          ? cloneVariation?.productQty
          : updatedQty,
      });
    }
  };

  const storeInCookies = () => {
    setCartTotal(total);
    var newArray = cartProducts.filter(function (el) {
      return el.product.product_type == "digital";
    });
    Cookies.set(
      "cartData",
      newArray.length ? newArray[0].product?.product_type : "physical"
    );
  };

  // Setting data to localstroage when uaf is not there
  const storeInLocalStorage = () => {
    setCartTotal(total);
    localStorage.setItem(
      "cart",
      JSON.stringify({ items: cartProducts, total: total })
    );
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        cartProducts,
        setCartProducts,
        cartTotal,
        setCartTotal,
        removeCart,
        clearCartProduct,
        getTotal,
        handleIncDec,
        cartToggle,
        cartToggleValue,
        variationModal,
        refetch,
        setVariationModal,
        isLoading,
        replaceCartLoader,
        replaceCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
