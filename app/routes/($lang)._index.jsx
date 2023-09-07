import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {
  ProductSwimlane, 
  FeaturedCollections,  

  Hero, 
  HeroBanner,
  FeaturedIn,
  FeelFulfilled,
  Science,
  Stats,
  Instagram,
  Newsletter,
  Pride,
  SkincareWand,
  RedefineSkincare,
  LuminKit,
  Faqs,
  FulfldOthers,
  Tiktok,
  Results,
  Testimonials,
} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {AnalyticsPageType} from '@shopify/hydrogen';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import i2 from '../styles/Export/Shamara-bondaroff.png'

export const headers = routeHeaders;

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.lang &&
    params.lang.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the lang URL param is defined, yet we still are on `EN-US`
    // the the lang param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });

  const seo = seoPayload.home();

  return defer(
    {
      shop,
      primaryHero: hero,
      // These different queries are separated to illustrate how 3rd party content
      // fetching can be optimized for both above and below the fold.
      featuredProducts: context.storefront.query(
        HOMEPAGE_FEATURED_PRODUCTS_QUERY,
        {
          variables: {
            /**
             * Country and language properties are automatically injected
             * into all queries. Passing them is unnecessary unless you
             * want to override them from the following default:
             */
            country,
            language,
          },
        },
      ),
      secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'backcountry',
          country,
          language,
        },
      }),
      featuredCollections: context.storefront.query(
        FEATURED_COLLECTIONS_QUERY,
        {
          variables: {
            country,
            language,
          },
        },
      ),
      tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
        variables: {
          handle: 'winter-2022',
          country,
          language,
        },
      }),
      analytics: {
        pageType: AnalyticsPageType.home,
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}

export default function Homepage() {
  const {
    primaryHero,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
  } = useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )} */}

      {HeroBanner && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={HeroBanner}>
            <HeroBanner/>
          </Await>
        </Suspense>
      )}

      <LuminKit/>
      <Results/>
      <SkincareWand/>
      <FeaturedIn/>
      <FeelFulfilled/>
      <Science/>
      <Stats/>
      <Esthetician/>
      <Pride/>
      <Testimonials/>
      <RedefineSkincare/>
      <FulfldOthers/>
      {/* <Tiktok/> */}
      <div className='bg-white flex justify-center'><Newsletter/></div>
      <Faqs/>
      <div className="bg-accent"><Instagram /></div>
    </>
  );
}

function Esthetician(){
  return(
    <div className="flex justify-center bg-accent text-black">
      <div className="md:grid md:grid-cols-2 flex flex-col-reverse justify-center
              align-middle gap-2  p-0">
        <div className="flex justify-center ">
          <div className="md:text-4xl sm:text-3xl text-2xl text-neue md:p-20 md:pr-24 p-4 max-w-[48em]">
            <div className="slide flex justify-start">
              <h1 className="font-neue">Esthetician-</h1>
              <h1 className="font-semibold">Approved</h1>
            </div>
            <div className='justify-end'>
              <div className="font-neue md:text-lg text-base md:mt-12 mt-3">
                “I use electricity to stimulate the facial muscles, basically giving your face a workout. Reeducating those muscles to actually lift, tighten, and stay where you want them. By stimulating collagen, it makes your face look bright and healthy, plus there's cell turnover, so it heals the skin. It's really good for acne; I treat a lot of young people because it speeds up the whole recovery process.”
              </div>
              <div className='md:p-4 p-0 mt-6 flex'>
                <div className="slide md:w-[16%] w-[25%] pr-3">
                  <img src={i2} height="" alt="" />
                </div>
                <div>
                  <div className='text-2xl font-semibold'>
                    Shamara Bondaroff
                  </div>
                  <div className="font-neue text-base">
                    Esthetician and founder of SB Skin
                  </div>
                  <div className="font-neue text-sm">
                    FEATURED IN VOGUE, ELLE, & INO THE GLOSS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[url("../styles/Export/blueLightGuy.jpg")] bg-cover'>
        </div>
      </div>
    </div>
  )
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  ${MEDIA_FRAGMENT}
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
`;

const COLLECTION_HERO_QUERY = `#graphql
  ${COLLECTION_CONTENT_FRAGMENT}
  query collectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
