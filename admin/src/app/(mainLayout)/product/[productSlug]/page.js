import axios from "axios";
import https from "https";
import ProductDetailContent from "@/components/productDetails";

export async function generateMetadata({ params }) {
   const { productSlug } = await params;
    const productData = await axios
      .get(`${process.env.URL}/product/slug/${productSlug}`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      })
    .then((res) => res?.data)
    .catch((err) => console.log("err", err));

    return {
      openGraph: {
        title: productData?.meta_title,
        description: productData?.meta_description,
        images: [productData?.product_meta_image?.original_url || ""],
      },
    };
}

const ProductDetails = async({ params }) => {
  const { productSlug } = await params;

  return <ProductDetailContent params={productSlug} />;
};

export default ProductDetails;
