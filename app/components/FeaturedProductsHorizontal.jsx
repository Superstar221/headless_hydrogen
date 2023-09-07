import clsx from 'clsx';
import {useEffect, useId, useMemo} from 'react';
import {useFetcher} from '@remix-run/react';
import {Heading, ProductCard, Skeleton, Text} from '~/components';
import {usePrefixPathWithLocale} from '~/lib/utils';

import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import stars from "../styles/Export/icons/stars.svg"
/**
 * Display a grid of products and a heading based on some options.
 * This components uses the storefront API products query
 * @param count number of products to display
 * @param query a filtering query
 * @param reverse wether to reverse the product results
 * @param sortKey Sort the underlying list by the given key.
 * @see query https://shopify.dev/api/storefront/2023-04/queries/products
 * @see filters https://shopify.dev/api/storefront/2023-04/queries/products#argument-products-query
 */
export function FeaturedProductsHorizontal({
  count = 4,
  heading = 'Shop Best Sellers',
  layout = 'drawer',
  onClose,
  query,
  reverse,
  sortKey = 'BEST_SELLING',
}) {
  const {load, data} = useFetcher();
  const queryString = useMemo(
    () =>
      Object.entries({count, sortKey, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [count, sortKey, query, reverse],
  );
  const productsApiPath = usePrefixPathWithLocale(
    `/api/products?${queryString}`,
  );

  useEffect(() => {
    load(productsApiPath);
  }, [load, productsApiPath]);

  return (
    <>
      <Heading format size="copy" className="t-4">
        {heading}
      </Heading>
      <div
        className={clsx([
          `grid grid-cols-1 gap-x-6 gap-y-8`,
          layout === 'page' ? 'md:grid-cols-4 sm:grid-col-4' : '',
        ])}
      >
        <FeatureProductsContent
          count={count}
          onClick={onClose}
          products={data?.products}
        />
      </div>
    </>
  );
}

/**
 * Render the FeaturedProducts content based on the fetcher's state. "loading", "empty" or "products"
 */
function FeatureProductsContent({count = 4, onClick, products}) {
  const id = useId();

  if (!products) {
    return (
      <>
        {[...new Array(count)].map((_, i) => (
          <div key={`${id + i}`} className="grid gap-2">
            <Skeleton className="aspect-[3/4]" />
            <Skeleton className="w-32 h-4" />
          </div>
        ))}
      </>
    );
  }

  if (products?.length === 0) {
    return <Text format>No products found.</Text>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCardHorizontal
          product={product}
          key={product.id}
          onClick={onClick}
          quickAdd
        />
      ))}
    </>
  );
}


export function ProductCardHorizontal({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
  variant
}) {
  let cardLabel;

  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };
  
  return (
    <div className="flex flex-row gap-2 font-light">
        <div className={clsx('grid gap-4 grid-cols-3', className)}>
          <div className="card-image aspect-square bg-primary/5 col-span-1">
            <Link
              onClick={onClick}
              to={`/products/${product.handle}`}
              prefetch="intent"
            >
              {image && (
                <Image
                  className="object-cover w-full fadeIn border border-accent rounded-xl"
                  sizes="(min-width: 32em) 25vw, (min-width: 24em) 30vw, 45vw"
                  aspectRatio="square"
                  data={image}
                  alt={image.altText || `Picture of ${product.title}`}
                  loading={loading}
                />
              )}
            </Link>
          </div>
          <div className="grid gap-1 col-span-2">
            <Link
              onClick={onClick}
              to={`/products/${product.handle}`}
              prefetch="intent"
            >
              <div className='text-base font-medium w-full overflow-hidden'>
                <h3>{product.title}</h3>
                <h3>{product.description}</h3>
              </div>
              <div className="flex gap-2">
                <Text className="flex gap-2">
                  <Money withoutTrailingZeros data={price} className="font-semibold md:text-lg text-base "/>
                  {isDiscounted(price, compareAtPrice) && (
                    <CompareAtPrice
                      className={'opacity-50 font-semibold text-lg'}
                      data={compareAtPrice}
                    />
                  )}
                </Text>
              </div>
            </Link>
            {quickAdd && (
              <AddToCartButton
                lines={[
                  {
                    quantity: 1,
                    merchandiseId: firstVariant.id,
                  },
                ]}
                variant="secondary"
                className="mt-1 border border-black bg-white text-background font-roman hover:bg-background hover:text-white transition-all rounded-md p-1"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price),
                }}
              >
                <Text as="span" className="flex items-center justify-center gap-2 uppercase text-sm">
                  Add to Cart
                </Text>
              </AddToCartButton>
            )}
          </div>
        </div>
    </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}

function TruncatedText({ text }) {
  // Split the text into an array of words
  const words = text.split(' ');

  // Get the first two words
  const truncatedText = words.slice(0, 2).join(' ');

  return <h3>{truncatedText}</h3>;
}