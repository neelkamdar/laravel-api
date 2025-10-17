import PagesContent from '@/components/pages/PagesContent'

export async function generateMetadata({ params }) { 
    const pageSlug = await params;
    // fetch data
    const pagesData = await fetch(`${process.env.URL}page/slug/${pageSlug}`).then((res) => res.json()).catch((err) => console.log("err", err))
    return {
        openGraph: {
            title: pagesData?.meta_title,
            description: pagesData?.meta_description,
            images: [
                {
                    // url: '../../../../../../public/assets/images/logo.png',
                    url: pagesData?.page_meta_image?.original_url,
                    width: 1200,
                    height: 600,
                },
                {
                    // url: pagesData?.page_meta_image?.original_url,
                    url: '../../../../../../public/assets/images/logo.png',
                    width: 1200,
                    height: 600,
                }
            ]
        },
    }
}
const Pages = async({ params }) => {
   const pageSlug = await params;
    return (
        params && <PagesContent pageSlug={pageSlug} />
    )
}

export default Pages