import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {useState} from 'react'
import bestSeller from '../styles/Export/icons/bestSeller.svg'
import stars from "../styles/Export/icons/stars.svg"
import kit from "../styles/Export/shopImage.jpg"
import elixir from "../styles/Export/ingredientsImage.jpg"
import wand from "../styles/Export/redLight.jpg"
export function ProductCard({
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

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = async () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  if(variant == '1') {
    return(
      <div className="flex flex-col md:gap-2 gap-1 font-light md:aspect-[9/16] justify-between pb-3 col-span-1" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image md:aspect-[5/6] bg-primary/5 relative">

            <div className={`relative md:aspect-[4/5] aspect-square w-full bg-cover bg-center`}>
              { product.handle == "lumin-kit" ?
                <div className="absolute top-0 right-0 z-10 aspect-square md:aspect-[5/4] bg-white rounded-full m-4 text-background">
                  <div className="z-1 md:w-20 w-16">
                    <img src={bestSeller}/>
                  </div>
                </div>: null
              }
              <Image
                className={`object-cover w-full border-black md:rounded-xl rounded-lg h-full md:aspect-[4/5] aspect-square z-1 transition-all absolute ${isHovering ? `opacity-0` : `opacity-100`}`}
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
              <img src={product.handle == "lumin-glow" ? wand : product.handle == "lumin-elixir" ? elixir : kit} className="object-cover w-full border-black md:rounded-xl rounded-lg h-full md:aspect-[4/5] aspect-square transition-all"/>
             
            </div>

            {/* {isHovering ? 
            
            <div className="relative md:aspect-[4/5] aspect-square w-full">
              <img src={product.handle == "lumin-glow" ? wand : product.handle == "lumin-elixir" ? elixir : kit} className="object-cover w-full border-black md:rounded-xl rounded-lg h-full md:aspect-[4/5] aspect-square hover:opacity-0 fadeIn"/>
            </div>
            :
            image && (
              <div className="relative md:aspect-[4/5] aspect-square w-full bg-black">
                <Image
                  className={`object-cover w-full border-black md:rounded-xl rounded-lg h-full md:aspect-[4/5] aspect-square hover:opacity-0 fadeIn ${isHovering ? `opacity-40` : `opacity-100`}`}
                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                  data={image}
                  alt={image.altText || `Picture of ${product.title}`}
                  loading={loading}
                />
              </div>)
            } */}
          </div>
          <div className="grid md:gap-5 gap-2">
            <div className='md:text-2xl sm:text-xl text-lg font-medium w-full'>
              <h3>{(product.title)}</h3>
              <h3>{product.description}</h3>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img src={stars} className='md:h-7 sm:h-6 h-5'/>
                <p className="md:text-lg text-base">(320+)</p>
              </div>
              <Text className="flex gap-4 align-baseline">
                {isDiscounted(price, compareAtPrice) && (
                  <CompareAtPrice
                    className={'opacity-50 font-semibold md:text-2xl sm:text-xl text-lg '}
                    data={compareAtPrice}
                  />
                )}
                <Money withoutTrailingZeros data={price} className="font-semibold md:text-2xl sm:text-xl text-lg"/>
              </Text>
            </div>
          </div>
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
          className="mt-2 border-black bg-black text-white md:p-3 p-2 rounded-md"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2 uppercase md:text-lg text-base">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 font-light">
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[5/6] bg-primary/5">
            {image && (
              <Image
                className="object-cover w-full fadeIn border-black rounded-xl"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text>
          </div>
          <div className="grid gap-1">
            <div className='md:text-2xl text-xl font-medium w-full overflow-hidden whitespace-nowrap'>
            <h3>{((product.title).split(' ')).slice(0, 2).join(' ')}</h3>
              <h3>{product.description}</h3>
            </div>
            <div className="flex gap-4">
              <Text className="flex gap-4">
                <Money withoutTrailingZeros data={price} className="font-semibold text-xl"/>
                {isDiscounted(price, compareAtPrice) && (
                  <CompareAtPrice
                    className={'opacity-50 font-semibold text-xl'}
                    data={compareAtPrice}
                  />
                )}
              </Text>
            </div>
          </div>
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
          className="mt-2 border-black bg-black text-white p-3 rounded-sm"
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="flex items-center justify-center gap-2 uppercase text-lg">
            Add to Cart
          </Text>
        </AddToCartButton>
      )}
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
