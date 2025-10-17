import BrandContainer from "@/components/brand/index";

export async function generateMetadata({ params }) {
  const { slug } = params;
  // fetch data
  const brandData = await fetch(`${process.env.URL}brand/slug/${slug}`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));

  return {
    openGraph: {
      title: brandData?.meta_title,
      description: brandData?.meta_description,
      images: [brandData?.brand_meta_image?.original_url, []],
    },
  };
}

const BrandPage = async ({ params }) => {
  const { slug } = params;

  return <BrandContainer brandSlug={slug} />;
};

export default BrandPage;
