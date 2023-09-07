import {useRef, Suspense, useMemo, useState, useEffect} from 'react';
import {Disclosure, Listbox, Transition} from '@headlessui/react';
import {defer} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Await,
  useSearchParams,
  useLocation,
  useNavigation,
} from '@remix-run/react';

import {AnalyticsPageType, Money, ShopPayButton} from '@shopify/hydrogen';
import {
  Heading,
  IconCaret,
  IconCheck,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Button,
  Features,
  SkincareWand,
  Results,
  Stats,
  Newsletter,
  Instagram,
  Faqs,
  Slider,
  Science,
  LuminKit,
  FulfldOthers,
  Testimonials,
  SkincareRoutine,
  Ingredients,
  ElixirOverview,
  KitYouNeed,
  WandModes,
  FeaturedIn,
  HowToUse
} from '~/components';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import invariant from 'tiny-invariant';
import {useMedia} from 'react-use';
import clsx from 'clsx';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
import {} from '~/components';
import wand from '../styles/Export/white-pink-red.png';
import stars from '../styles/Export/icons/stars.svg';
import limitedOffer from '../styles/Export/icons/limitedofferfull.svg';
import limitedOfferMobile from '../styles/Export/icons/limitedoffermobile.svg';
import o1 from '../styles/Export/icons/pinkSwatch.svg';
import o2 from '../styles/Export/icons/blackSwatch.svg';
import {PlanPicker} from '~/components/PlanPicker';
import {PlanPickerKit} from '~/components/PlanPickerKit';
import {KIT_REFILL_QUANTITY_OPTION_NAME} from '~/lib/const';

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer(
    {
      product,
      shop,
      storeDomain: shop.primaryDomain.url,
      recommended,
      analytics: {
        pageType: AnalyticsPageType.product,
        resourceId: product.id,
        products: [productAnalytics],
        totalValue: parseFloat(selectedVariant.price.amount),
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

export default function Product() {
  let scrollRef = useRef(null);
  let [isFixed, setIsFixed] = useState(null);

  useEffect(() => {
    setIsFixed('top');
    const handleScroll = () => {
      if (window.scrollY < 50) {
        if (setIsFixed != 'top') {
          setIsFixed('top');
        }
      } else if (
        window.scrollY > 50 &&
        window.scrollY < scrollRef.current.clientHeight - 775
      ) {
        setIsFixed('scrolled');
      } else if (window.scrollY > scrollRef.current.clientHeight - 775) {
        setIsFixed('bottom');
      } else {
        // alert(`Scroll`);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef]);

  const {product, shop, recommended} = useLoaderData();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const comparePrice = selectedVariant?.compareAtPrice?.amount;
  const actualPrice = selectedVariant?.price?.amount;

  const save = comparePrice - actualPrice;

  useEffect(() => {
    const _learnq = window._learnq || [];
    const productKlaviyo = {
      Name: product.title,
      ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
      ImageURL: selectedVariant.image.url,
      URL: location.href,
      Brand: product.vendor,
      Price: actualPrice,
      CompareAtPrice: comparePrice,
    };
    _learnq.push(['track', 'Viewed Product', productKlaviyo]);
  }, []);
  
  return (
    <>
      <div className="md:flex md:justify-center lg:pt-[120px]">
        <Section className="px-0 md:hidden block lg:px-12 bg-white text-black lg:pb-0  hiddenScroll md:overflow-y-scroll md:max-h-screen">
          <div className="grid items-start md:gap-8 lg:gap-12 md:grid-cols-2 pt-0 mt-0 lg:grid-cols-2">
            <div className="md:top-nav md:-translate-y-nav md:pt-nav p-0 -mt-8 ">
              <ProductGallery
                media={media.nodes}
                className="lg:col-span-1"
                save={comparePrice && save}
              />
            </div>
            <div>
              <div className="">
                <section className="flex flex-col w-[100%] max-w-full md:gap-8 gap-4 md:px-0 md:max-w-2xl justify-start">
                  <div className="grid gap-2 p-4 ">
                    {product.id == 'gid://shopify/Product/8277727805737' ? (
                      <>
                        <img src={limitedOfferMobile} className="block md:hidden"/>
                        <img src={limitedOffer} className="hidden md:block"/>
                      </>
                    ) : (
                      <></>
                    )}
                    <Heading
                      as="h2"
                      className="whitespace-normal font-medium lg:text-4xl md:text-3xl sm:text-2xl text-xl"
                    >
                      {title}
                    </Heading>
                    <div className="md:hidden ">
                      {product.id == 'gid://shopify/Product/8073863659817' ? (
                        <Reviews variant="1" />
                      ) : product.id ==
                        'gid://shopify/Product/8277727805737' ? (
                        <Reviews variant="3" />
                      ) : (
                        <Reviews variant="2" />
                      )}
                    </div>
                    <div className="md:block hidden">
                      {product.id == 'gid://shopify/Product/8073863659817' ? (
                        <Reviews variant="1" />
                      ) : product.id ==
                        'gid://shopify/Product/8277727805737' ? (
                        <Reviews variant="3" />
                      ) : (
                        <Reviews variant="2" />
                      )}
                    </div>
                    <h3
                      className="font-neue text-black md:text-lg sm:text-base text-sm break whitespace-pre-line -mb-4 md:mb-0"
                      dangerouslySetInnerHTML={{__html: descriptionHtml}}
                    />
                  </div>
                  {product.id == 'gid://shopify/Product/8269131841833' ? (
                    <Features variant="1" />
                  ) : (
                    <Features />
                  )}
                  <ProductForm />
                  <div className="grid py-4 pb-0 text-background md:px-0 px-4">
                    {product.id == 'gid://shopify/Product/8073863659817' ? (
                      <ProductDetailByProduct variant="1" />
                    ) : product.id == 'gid://shopify/Product/8277727805737' ? (
                      <ProductDetailByProduct variant="3" />
                    ) : (
                      <ProductDetailByProduct variant="2" />
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Section>
        <div className="md:grid md:grid-cols-2 hidden place-items-end  h-fit md:gap-8 lg:gap-12 pt-0 mt-0 px-0 md:px-8 lg:px-12 bg-white text-black lg:pb-0 relative max-w-[120em]">
          <div
            className={`${isFixed == 'bottom' ? 'hidden ' : 'flex'} col-span-1`}
          ></div>
          <div
            className={`${isFixed == null
                ? 'right-[49%] absolute top-20 p-12 pr-[44px] pt-20'
                : isFixed == 'top'
                  ? 'right-[49%] fixed top-[86px] p-12 pr-[44px] pt-20'
                  : isFixed == 'scrolled'
                    ? 'right-[49%] top-[55px] fixed p-12 pr-[44px] pt-4'
                    : 'right-[49%] static'
              }   left-0  lg:pt-10 col-span-1 justify-end`}
          >
            <div className="flex justify-end">
              <div className="max-w-[55em]">
                <ProductGallery
                  media={media.nodes}
                  className="lg:col-span-1"
                  save={comparePrice && save}
                />
              </div>
            </div>
          </div>
          <div ref={scrollRef}
            className=" md:-mb-nav md:top-nav md:-translate-y-nav md:h-auto md:pt-nav md:w-full">
            <section className="flex flex-col w-[100%] max-w-full gap-8 md:px-0 md:max-w-2xl justify-start">
              <div className="grid gap-2 p-4 px-0">
                <div className="md:hidden ">
                  {product.id == 'gid://shopify/Product/8073863659817' ? (
                    <Reviews variant="1" />
                  ) : product.id == 'gid://shopify/Product/8277727805737' ? (
                    <Reviews variant="3" />
                  ) : (
                    <Reviews variant="2" />
                  )}
                </div>
                {product.id == 'gid://shopify/Product/8277727805737' ? (
                  <img src={limitedOffer} />
                ) : (
                  <></>
                )}
                <Heading
                  as="h2"
                  className="whitespace-normal font-medium lg:text-4xl md:text-3xl sm:text-2xl text-xl"
                >
                  {title}
                </Heading>
                <div className="md:block hidden">
                  {product.id == 'gid://shopify/Product/8073863659817' ? (
                    <Reviews variant="1" />
                  ) : product.id == 'gid://shopify/Product/8277727805737' ? (
                    <Reviews variant="3" />
                  ) : (
                    <Reviews variant="2" />
                  )}
                </div>
                <div
                  className="font-light text-black md:text-lg text-base break whitespace-pre-line -mb-4"
                  dangerouslySetInnerHTML={{__html: descriptionHtml}}
                />
              </div>
              {product.id == 'gid://shopify/Product/8073863659817' && 
                <div className= "font-light md:text-lg text-base mt-3 md:hidden block">
                  <span className="">Save an extra $40 + FREE Activating Serum when upgrading to our Lumin Kit.</span>
                  <Link className="underline font-roman" to="/products/lumin-kit" prefetch="intent">
                    <span className="ml-1">
                      Learn More
                    </span>
                  </Link>
                </div>
              }
              {product.id == 'gid://shopify/Product/8269131841833' ? (
                <Features variant="1" />
              ) : (
                <Features />
              )}
              <div className="z-50">
                <ProductForm />
              </div>

              <div className="grid py-4 pb-1 text-background md:px-0 px-4">
                {product.id == 'gid://shopify/Product/8073863659817' ? (
                  <ProductDetailByProduct variant="1" />
                ) : product.id == 'gid://shopify/Product/8277727805737' ? (
                  <ProductDetailByProduct variant="3" />
                ) : (
                  <ProductDetailByProduct variant="2" />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div>
        {product.id == 'gid://shopify/Product/8073863659817' ? (
          <ProductContent variant="1" />
        ) : product.id == 'gid://shopify/Product/8277727805737' ? (
          <ProductContent variant="2" />
        ) : (
          <ProductContent variant="3" />
        )}
      </div>
    </>
  );
}

export function ProductForm() {
  const {product, analytics, storeDomain} = useLoaderData();

  const isDesktop = useMedia('(min-width: 48em)');

  const [currentSearchParams] = useSearchParams();
  const {location} = useNavigation();

  /**
   * We update `searchParams` with in-flight request data from `location` (if available)
   * to create an optimistic UI, e.g. check the product option before the
   * request has completed.
   */
  const searchParams = useMemo(() => {
    return location
      ? new URLSearchParams(location.search)
      : currentSearchParams;
  }, [currentSearchParams, location]);

  const firstVariant = product.variants.nodes[0];

  /**
   * We're making an explicit choice here to display the product options
   * UI with a default variant, rather than wait for the user to select
   * options first. Developers are welcome to opt-out of this behavior.
   * By default, the first variant's options are used.
   */
  const searchParamsWithDefaults = useMemo(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const productAnalytics = {
    ...analytics.products[0],
    quantity: 1,
  };

  var [selectedQuantity, setSelectedQuantity] = useState(1);
  var [vPrice, setVPrice] = useState();

  useEffect(() => {
    // "productGid":"gid://shopify/Product/8269131841833"
    selectedVariant.id == 'gid://shopify/ProductVariant/45247206031657'
      ? setVPrice('$49')
      : selectedVariant.id == 'gid://shopify/ProductVariant/45247206064425'
      ? setVPrice('$96')
      : setVPrice('$144');
  }, [product.selectedVariant]);

  function increaseQuantity() {
    setSelectedQuantity(selectedQuantity + 1);
  }

  function decreaseQuantity() {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  }

  const [sellingPlan, setSellingPlan] = useState(false);

  // If kit product use PlanPickerKit, else use basic PlanPicker
  const PlanPickerComponent =
    product.id == 'gid://shopify/Product/8277727805737'
      ? PlanPickerKit
      : PlanPicker;

  const totalPrice = useMemo(() => {
    if (!sellingPlan) {
      return selectedVariant.price;
    }

    const adjustmentValue = sellingPlan.priceAdjustments[0].adjustmentValue;
    let price = 0;
    if (adjustmentValue.adjustmentPercentage) {
      price = Math.floor(
        selectedVariant.price.amount *
          (1 - adjustmentValue.adjustmentPercentage / 100),
      );
    } else if (adjustmentValue.price) {
      price = adjustmentValue.price.amount;
    } else if (adjustmentValue.adjustmentAmount) {
      price =
        selectedVariant.price.amount - adjustmentValue.adjustmentAmount.amount;
    }

    return {
      ...selectedVariant.price,
      amount: String(price),
    };
  }, [selectedVariant, sellingPlan]);

  const savePercent = useMemo(() => {
    return (
      ((selectedVariant?.compareAtPrice?.amount - totalPrice.amount) /
        selectedVariant?.compareAtPrice?.amount) *
      100
    );
  }, [selectedVariant, totalPrice]);

  return (
    <>
      {!isDesktop && (
        <div className="px-4 my-2">
          <PlanPickerComponent
            product={product}
            selectedVariant={selectedVariant}
            onChange={(sellingPlan) => setSellingPlan(sellingPlan)}
          />
        </div>
      )}
      <div className="md:gap-10 md:relative fixed bottom-0 border-t border-secondary md:border-none md:bottom-auto md:bg-white bg-beige md:p-0 p-2 md:py-0 py-2 md:pt-0 pt-3 md:w-auto w-full md:z-auto z-50">
        <div className="grid md:gap-4">
          <div className="md:block flex flex-col justify-between md:justify-start">
            <ProductOptions
              options={product.options}
              searchParamsWithDefaults={searchParamsWithDefaults}
            />

            {isDesktop && (
              <PlanPickerComponent
                product={product}
                selectedVariant={selectedVariant}
                onChange={(sellingPlan) => setSellingPlan(sellingPlan)}
              />
            )}

            <div className="text-2xl border border-black rounded-full gap-3 p-1 align-middle md:hidden grid-cols-3 mr-2 hidden mb-3">
              <button onClick={increaseQuantity}>+</button>
              <h3 className="flex flex-col justify-center font-semibold ml-1">
                {selectedQuantity}
              </h3>
              <button onClick={decreaseQuantity}>-</button>
            </div>
          </div>
          <div className="">
            {selectedVariant && (
              <div className="items-stretch gap-2">
                {isOutOfStock ? (
                  <Button variant="secondary" disabled>
                    <Text>Sold out</Text>
                  </Button>
                ) : (
                  <div className="flex">
                    <div className="text-2xl md:border  border-black rounded-full gap-3 p-2 align-middle md:grid grid-cols-3 mr-2 hidden">
                      <button onClick={increaseQuantity}>+</button>
                      <h3 className="flex flex-col justify-center font-semibold ml-1">
                        {selectedQuantity}
                      </h3>
                      <button onClick={decreaseQuantity}>-</button>
                    </div>
                    <div className="grow">
                      <AddToCartButton
                        lines={[
                          {
                            merchandiseId: selectedVariant.id,
                            quantity: selectedQuantity,
                            ...(sellingPlan && {sellingPlanId: sellingPlan.id}),
                          },
                        ]}
                        className="bg-background text-white md:p-4 p-4 md:px-6 px-5 rounded-full md:text-xl text-base flex grow"
                        variant="primary"
                        data-test="add-to-cart"
                        analytics={{
                          products: [productAnalytics],
                          totalValue: parseFloat(productAnalytics.price),
                        }}
                      >
                        <Text
                          as="span"
                          className="flex flex-none w-full items-between font-light justify-between md:gap-2 gap-1"
                        >
                          <span className="md:text-lg text-base">
                            ADD TO CART{' '}
                          </span>

                          <div className="flex">
                            {isOnSale && (
                              <div className="bg-accent text-background mx-2 text-sm px-2 py-1 rounded-lg font-light">
                                (Save {Math.round(savePercent)}%)
                              </div>
                            )}
                            {isOnSale && (
                              <Money
                                withoutTrailingZeros
                                data={selectedVariant?.compareAtPrice}
                                as="span"
                                className="opacity-50 strike mr-2 md:text-xl sm:text-lg text-base"
                              />
                            )}
                            <div className="font-bold md:text-xl sm:text-lg text-base">
                              <Money
                                withoutTrailingZeros
                                data={totalPrice}
                                as="span"
                                className=""
                              />
                            </div>
                          </div>
                        </Text>
                      </AddToCartButton>
                      <div className="flex md:hidden w-full md:text-base lg:text-lg sm:text-base text-sm self-center justify-center md:gap-4 gap-1 font-neue mt-2">
                        <span>30 Day Trial</span>
                        <span>•</span>
                        <span>1 Year Warranty</span>
                        <span>•</span>
                        <span>Free Shipping</span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  {product.id == 'gid://shopify/Product/8073863659817' && 
                    <div className= "font-light md:text-lg text-base mt-3 md:block hidden">
                      <span className="">Save an extra $40 + FREE Activating Serum when upgrading to our Lumin Kit.</span>
                      <Link className="underline font-roman" to="/products/lumin-kit" prefetch="intent">
                        <span className="ml-1">
                          Learn More
                        </span>
                      </Link>
                    </div>
                  }
                </div>
                {!isOutOfStock && (
                  <></>
                  // <ShopPayButton
                  //   width="100%"
                  //   variantIds={[selectedVariant?.id]}
                  //   storeDomain={storeDomain}
                  // />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ProductOptions({options, searchParamsWithDefaults}) {
  const closeRef = useRef(null);
  return (
    <>
      {options
        .filter(
          (option) =>
            option.values.length > 1 &&
            !option.name.includes(KIT_REFILL_QUANTITY_OPTION_NAME),
        )
        .map((option) => (
          <div
            key={option.name}
            className="flex flex-row flex-wrap mb-4 gap-x-2 last:mb-0 items-center md:border-t border-none border-background md:py-3 py-0"
          >
            <Heading
              as="legend"
              size="lead"
              className="min-w-[4rem] lg:text-xl md:text-lg align-middle text-center font-roman"
            >
              {option.name}:
            </Heading>
            <div className="flex flex-wrap items-baseline gap-4">
              {option.values.length > 7 ? (
                <div className="relative w-full">
                  <Listbox>
                    {({open}) => (
                      <>
                        <Listbox.Button
                          ref={closeRef}
                          className={clsx(
                            'flex items-center justify-between w-full py-3 px-4 border border-primary',
                            open
                              ? 'rounded-b md:rounded-t md:rounded-b-none'
                              : 'rounded',
                          )}
                        >
                          <span>
                            {searchParamsWithDefaults.get(option.name)} 
                          </span>
                          
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Listbox.Button>
                        <Listbox.Options
                          className={clsx(
                            'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                            open ? 'max-h-48' : 'max-h-0',
                          )}
                        >
                          
                          {option.values.map((value) => (
                            <Listbox.Option
                              key={`option-${option.name}-${value}`}
                              value={value}
                            >
                              {({active}) => (
                                <ProductOptionLink
                                  optionName={option.name}
                                  optionValue={value}
                                  className={clsx(
                                    'text-primary w-full p-2 transition flex justify-start items-center text-left cursor-pointer rounded-full',
                                    active && 'border-2 border-black ',
                                  )}
                                  searchParams={searchParamsWithDefaults}
                                
                                  onClick={() => {
                                    if (!closeRef?.current) return;
                                    closeRef.current.click();
                                  }}
                                >
                                  {value}
                                  {searchParamsWithDefaults.get(option.name) ===
                                    value && (
                                    <span className="ml-2">
                                      <IconCheck />
                                    </span>
                                  )}
                                </ProductOptionLink>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    )}
                  </Listbox>
                </div>
              ) : (
                <>
                  {option.values.map((value) => {
                    const checked =
                      searchParamsWithDefaults.get(option.name) === value;
                    const id = `option-${option.name}-${value}`;

                    return (
                      <Text key={id}>
                        <ProductOptionLink
                          optionName={option.name}
                          optionValue={value}
                          searchParams={searchParamsWithDefaults}
                          isChecked={checked}
                          className={clsx(
                            'border-2 border-background cursor-pointer transition-all duration-200 rounded-full',
                            checked ? 'border-2' : 'border',
                          )}
                        />
                      </Text>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

function ProductContent({variant}) {
  if (variant == '1') {
    return (
      <>
        <Slider />
        <Results />
        <SkincareWand />
        <Science isDark="1" />
        <WandModes />
        <SkincareRoutine />
        <HowToUse />
        <Stats />
        <Testimonials />
        <div className="bg-accent md:p-16 p-4 flex justify-center text-white">
          <Newsletter />
        </div>
        <Faqs />
        <div className="bg-accent">
          <Instagram />
        </div>
      </>
    );
  } else if (variant == '3') {
    return (
      <>
        <Slider />
        <ElixirOverview />
        <Ingredients />
        <LuminKit />
        <Stats />
        <Testimonials />
        <div className="bg-accent md:p-16 p-4 flex justify-center text-white">
          <Newsletter />
        </div>
        <Faqs />
        <div className="bg-accent">
          <Instagram />
        </div>
      </>
    );
  } else if (variant == '2') {
    return (
      <>
        <Slider />
        <div className="mt-4">
          <Results />
        </div>
        <SkincareWand2 />
        <Ingredients />
        {/* <KitYouNeed /> */}
        <SkincareRoutine />
        <HowToUse />
        <FeaturedIn />
        <FulfldOthers />
        <Stats />
        <Testimonials />
        <div className="bg-accent md:p-16 p-0 flex justify-center text-white">
          <Newsletter />
        </div>
        <Faqs />
        <div className="bg-accent">
          <Instagram />
        </div>
      </>
    );
  }
}

function ProductOptionLink({
  optionName,
  optionValue,
  searchParams,
  isChecked,
  children,
  ...props
}) {
  const {pathname} = useLocation();
  const isLangPathname = /\/[a-zA-Z]{2}-[a-zA-Z]{2}\//g.test(pathname);
  // fixes internalized pathname
  const path = isLangPathname
    ? `/${pathname.split('/').slice(2).join('/')}`
    : pathname;

  const clonedSearchParams = new URLSearchParams(searchParams);
  clonedSearchParams.set(optionName, optionValue);

  const swatch =
    (children ?? optionValue) == 'Pink' ? (
      <img
        src={o1}
        className={clsx(
          'ring-background cursor-pointer transition-all duration-200 rounded-full md:w-auto w-7',
          isChecked ? 'md:mt-0 -mt-1 ring-2 p-0.5' : 'ring-0 md:m-0.5 m-0',
        )}
      />
    ) : (children ?? optionValue) == 'Black' ? (
      <img
        src={o2}
        className={clsx(
          'ring-background cursor-pointer transition-all duration-200 rounded-full md:w-auto w-7',
          isChecked ? 'md:mt-0 -mt-1 ring-2 p-0.5' : 'ring-0 md:m-0.5 m-0',
        )}
      />
    ) : (
      <h3
        className={
          isChecked
            ? 'bg-secondary text-white font-medium border border-accent rounded-full px-2 md:px-4 md:py-1 md:text-lg'
            : 'bg-beige text-black font-light border border-accent rounded-full px-2 md:px-4 md:py-1 md:text-lg'
        }
      >
        {optionValue}
      </h3>
    );
  // const styles = clonedSearchParams.toString() == "Color=Pink" ? true : false;

  return (
    <Link
      className="p-0"
      preventScrollReset
      prefetch="intent"
      replace
      to={`${path}?${clonedSearchParams.toString()}`}
    >
      {children ?? swatch}
    </Link>
  );
}


function ProductDetail({ title, content, learnMore }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid w-full gap-2 py-3 border-t-2 border-accent">
      <button
        className="text-left font-neue w-full md:text-lg text-base"
        onClick={handleToggleClick}
      >
        <div className="flex justify-between">
          <h3 className="md:text-lg text-base font-roman">{title}</h3>
          <IconClose
            className={clsx(
              'transition-transform transform-gpu duration-200 ',
              isOpen ? '' : 'rotate-[45deg]'
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div className="pb-4 pt-2 grid gap-2 font-neue md:text-lg text-sm">
          <div
            className="text-secondary w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {learnMore && (
            <div className="">
              <Link
                className="pb-px border-b border-primary/30 text-accent"
                to={learnMore}
              >
                Learn more
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductDetailByProduct({variant}) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDropdownClick = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  if (variant == '1') {
    return (
      <>
        <ProductDetail
          title="MORE INFO ABOUT THE LUMIN GLOW"
          content="<p> The Lumin Glow 5-in-1 Wand was created to be effortlessly used. Simply glide the Wand over your face and enjoy the relaxing warmth and facial massage it provides. The Wand is recommended to be used 5 minutes a day, 3-5 days a week. It is travel-friendly, light, and can easily alternate between Red and Blue Light modes.
          </p>
          <p><br/>For best results, apply our Lumin Elixir to the face prior to using the Wand. The combined use of the Wand and Elixir increases absorption, blood circulation, and collagen stimulation providing the best therapeutic outcome. The facial massage has 3 intensity modes which can easily be alternated with the press of a button. As your skin acclimates to the Wand, the intensity, frequency and length of treatments can be increased.</p>"
          isOpen={expandedIndex === 0}
          onDropdownClick={() => handleDropdownClick(0)}
          index={0}
        />
        <ProductDetail
          title="TECHNOLOGIES"
          content="<b>Red Light Therapy</b><br/>
          Red Light Therapy helps improve circulation and promote collagen and fibroblast production. It works by delivering low-level red light wavelengths at 620-630nm. It is a safe, painless and non-invasive treatment which initiates a healthy inflammatory response. 
          <br/><br/>
          <b>Blue Light Therapy</b><br/>
          Blue Light Therapy helps destroy any bacteria responsible for acne. It works by delivering low-level blue light wavelengths at 420-430nm. It is a safe, painless and non-invasive treatment which reduces sebum production and prevents breakouts. 
          <br/><br/>
          <b>Microcurrent</b><br/>
          Microcurrent Therapy helps stimulate skin and facial muscles. It works by delivering low-voltage electrical waves at 270 microamps. It is a safe and clinically-proven treatment which promotes blood flow,  collagen production, and lymphatic drainage resulting in a toned and contoured appearance of your facial muscles.
          <br/><br/>
          <b>Facial Massage</b><br/>
          Facial Massage is a rejuvenating treatment which helps improve the appearance of skin. It works by stimulating blood circulation and promoting relaxation which results in a more youthful and glowing complexion.
          <br/><br/>
          <b>Therapeutic Warmth</b><br/>
          Therapeutic Warmth helps rejuvenate and promote healthy skin. It works by delivering heat waves at 100-113°F (38-45°C). It is a safe, painless, and relaxing treatment which increases blood flow to the skin while improving absorption of serums."
          isOpen={expandedIndex === 1}
          onDropdownClick={() => handleDropdownClick(1)}
          index={1}
        />
        <ProductDetail
          title="HOW TO USE"
          content="The Lumin 5-in-1 Wand was created to be effortlessly used. Simply glide the Wand over your face and enjoy the relaxing warmth and facial massage it provides. The Wand is recommended to be used 5 minutes a day, 3-5 days a week. It is travel-friendly, light, and can easily alternate between Red and Blue Light modes.<br/> <br/>
          For best results, apply our Lumin Elixir to the face prior to using the Wand. The combined use of the Wand and Elixir increases absorption, blood circulation, and collagen stimulation providing the best therapeutic outcome. The facial massage has 3 intensity modes which can easily be alternated with the press of a button. As your skin acclimates to the Wand, the intensity, frequency and length of treatments can be increased."
          isOpen={expandedIndex === 2}
          onDropdownClick={() => handleDropdownClick(2)}
          index={2}
        />
        <ProductDetail
          title="WHAT'S INCLUDED"
          content="<ul>
            <li>○ The Lumin Glow 5-in-1 Skincare Wand</li>
            <li>○ User Manual</li>
            <li>○ Charging Cable</li>
          </ul>"
          isOpen={expandedIndex === 3}
          onDropdownClick={() => handleDropdownClick(3)}
          index={3}
        />
        <ProductDetail
          title="SPECIFICATIONS"
          content="
          <ul>
            <li>○ LED wavelengths: <br/>Red:620 - 630 nm <br/>Blue: 465 - 470 nm</li>
            <li>○ Max. output optical power density: 45-50mW/cm²</li>
            <li>○ LEDs: 5</li>
            <li>○ Warmth: 38-45°C</li>
            <li>○ Vibration: Built-in</li>
            <li>○ Operating temperature: 0-40°C</li>
            <li>○ Storing and transport temperature: -5°C--60°C</li>
            <li>○ Operating humidity: 30%-95% without condensation</li>
            <li>○ Storage and Transport humidity: 20%-95% without condensation</li>
            <li>○ Charging supply: 5V 1A</li>
            <li>○ Charging port: Type-C</li>
            <li>○ Charging cable: Type-A</li>
            <li>○ Charging cable length: 60CM</li>
            <li>○ Battery: 3.7V, 350 mAh</li>
            <li>○ Battery type: Lithium-ion</li>
            <li>○ Charging time: 1-2 times a day</li>
            <li>○ Recommended Use: 1-2 times a day</li>
            <li>○ Treatment time: 45-50mW/cm²</li>
            <li>○ LED wavelengths: 5-10 minutes each time</li>
            <li>○ Weight of the device: 45g</li>
            <li>○ Product Model: 1608</li>
          </ul>"
          isOpen={expandedIndex === 4}
          onDropdownClick={() => handleDropdownClick(4)}
          index={4}
        />
      </>
    );
  } else if (variant == '2') {
    return (
      <>
        <ProductDetail
          title="PRODUCT DETAILS"
          content="Hyaluronic Acid 2% + B5 is a water-based formula combining low, medium, and high molecular weight hyaluronic acid molecules with Pro-Vitamin B5.
          <br/><br/>The Hyaluronic Acid promotes deep hydration to multiple layers of skin while targeting wrinkles and any irregularities.
          <br/><br/>The Pro-Vitamin B5 enhances hydration of the outer skin layers, resulting in smoother, more radiant glowing skin. 
          pH 6.00-7.50
          "
          isOpen={expandedIndex === 0}
          onDropdownClick={() => handleDropdownClick(0)}
          index={0}
        />
        <ProductDetail
          title="ALL INGREDIENTS"
          content="Water, Propylene Glycol, Sodium Hyaluronate (2% Hyaluronic Acid), Panthenol (Vitamin B5), Aloe Barbadensis Leaf Juice (Aloe Vera), Tripeptide-1, Butylene Glycol, Phenoxyethanol, Potassium Sorbate, Sodium Benzoate, Dextran, Citric Acid"
          isOpen={expandedIndex === 1}
          onDropdownClick={() => handleDropdownClick(1)}
          index={1}
        />
        <ProductDetail
          title="APPLICATION"
          content="○ Apply a few drops directly to the face. 
          <br/>○ Use only as directed on unbroken skin. 
          <br/>○ When using with our Lumin Glow Wand, be sure to avoid high risk areas (see FAQs).
          <br/>○ If irritation occurs, rinse off immediately and monitor. 
          <br/>○ If irritation and/or inflammation becomes persistent, consult a physician.
          "
          isOpen={expandedIndex === 2}
          onDropdownClick={() => handleDropdownClick(2)}
          index={2}
        />
        <ProductDetail
          title="KEY INGREDIENTS"
          content="<b>Hyaluronic Acid:</b>
          <br/>
          A water-based formula combining low, medium, and high molecular weight of Hyaluronic Acid molecules with a crosspolymer. The molecules’ ability to hold 1000x their water weight result in intense hydration to multiple skin layers whilst targeting the appearance of fine lines and wrinkles. 
          <br/><br/>
          <b>Vitamin B5:</b>
          <br/>
          Provitamin B5 works in conjunction with the Hyaluronic Acid to enhance hydration to the outer skin layers. The deep nourishment along with the ability to revive the skin results in smoother, plumper skin with a youthful radiance.  
          <br/><br/>
          
          <b>Aloe Vera:</b>
          <br/>
          Aloe Barbadensis Leaf Juice has the ability to not only boost skin hydration, but also reduce the look of skin redness caused by irritation. It serves an important role of strengthening and maintaining skin barrier function leaving your skin luminous and replenished. 
          <br/><br/>
          
          <b>Tripeptide-1:</b>
          <br/>
          A three amino acid peptide known for its stimulation of collagen, fibronectin and elastin. This collagen-fragment peptide signals the skin to create new collagen when it naturally breaks down, resulting in skin firmness and a renewed complexion. 
          "
          isOpen={expandedIndex === 3}
          onDropdownClick={() => handleDropdownClick(3)}
          index={3}
        />
        <ProductDetail
          title="CONSUMER RESULTS"
          content="Short-term and long-term clinical results.  
          <br/><br/><b>1 week:</b> Boosts skin hydration
          <br/><b>2-3 weeks:</b> helped with skin blemishes, acne, wrinkles, fine lines, puffiness, inflammation, radiance and tightness
          <br/><b>4 weeks:</b> Strengthens skin barrier and reduces fine lines and wrinkles
          "
          isOpen={expandedIndex === 4}
          onDropdownClick={() => handleDropdownClick(4)}
          index={4}
        />
      </>
    );
  } else {
    return (
      <>
        <ProductDetail
          title="TECHNOLOGIES"
          content="<b>Red Light Therapy</b><br/>
          Red Light Therapy helps improve circulation and promote collagen and fibroblast production. It works by delivering low-level red light wavelengths at 620-630nm. It is a safe, painless and non-invasive treatment which initiates a healthy inflammatory response. 
          <br/><br/>
          <b>Blue Light Therapy</b><br/>
          Blue Light Therapy helps destroy any bacteria responsible for acne. It works by delivering low-level blue light wavelengths at 420-430nm. It is a safe, painless and non-invasive treatment which reduces sebum production and prevents breakouts. 
          <br/><br/>
          <b>Microcurrent</b><br/>
          Microcurrent Therapy helps stimulate skin and facial muscles. It works by delivering low-voltage electrical waves at 270 microamps. It is a safe and clinically-proven treatment which promotes blood flow,  collagen production, and lymphatic drainage resulting in a toned and contoured appearance of your facial muscles.
          <br/><br/>
          <b>Facial Massage</b><br/>
          Facial Massage is a rejuvenating treatment which helps improve the appearance of skin. It works by stimulating blood circulation and promoting relaxation which results in a more youthful and glowing complexion.
          <br/><br/>
          <b>Therapeutic Warmth</b><br/>
          Therapeutic Warmth helps rejuvenate and promote healthy skin. It works by delivering heat waves at 100-113°F (38-45°C). It is a safe, painless, and relaxing treatment which increases blood flow to the skin while improving absorption of serums."
          isOpen={expandedIndex === 0}
          onDropdownClick={() => handleDropdownClick(0)}
          index={0}
        />
        <ProductDetail
          title="HOW TO USE"
          content="The Lumin 5-in-1 Wand was created to be effortlessly used. Simply glide the Wand over your face and enjoy the relaxing warmth and facial massage it provides. The Wand is recommended to be used 5 minutes a day, 3-5 days a week. It is travel-friendly, light, and can easily alternate between Red and Blue Light modes.<br/> <br/>
          For best results, apply our Lumin Elixir to the face prior to using the Wand. The combined use of the Wand and Elixir increases absorption, blood circulation, and collagen stimulation providing the best therapeutic outcome. The facial massage has 3 intensity modes which can easily be alternated with the press of a button. As your skin acclimates to the Wand, the intensity, frequency and length of treatments can be increased."
          isOpen={expandedIndex === 1}
          onDropdownClick={() => handleDropdownClick(1)}
          index={1}
        />
        <ProductDetail
          title="WHAT'S INCLUDED"
          content="<ul>
          <li>○ The Lumin Glow 5-in-1 Skincare Wand</li>
          <li>○ The Lumin Elixir Activating Serum</li>
          <li>○ User Manual</li>
          <li>○ Charging Cable</li>
        </ul>"
        isOpen={expandedIndex === 2}
          onDropdownClick={() => handleDropdownClick(2)}
          index={2}
        />
        <ProductDetail
          title="SPECIFICATIONS"
          content="
          <ul>
            <li>○ LED wavelengths: <br/>Red:620 - 630 nm <br/>Blue: 465 - 470 nm</li>
            <li>○ Max. output optical power density: 45-50mW/cm²</li>
            <li>○ LEDs: 5</li>
            <li>○ Warmth: 38-45°C</li>
            <li>○ Vibration: Built-in</li>
            <li>○ Operating temperature: 0-40°C</li>
            <li>○ Storing and transport temperature: -5°C--60°C</li>
            <li>○ Operating humidity: 30%-95% without condensation</li>
            <li>○ Storage and Transport humidity: 20%-95% without condensation</li>
            <li>○ Charging supply: 5V 1A</li>
            <li>○ Charging port: Type-C</li>
            <li>○ Charging cable: Type-A</li>
            <li>○ Charging cable length: 60CM</li>
            <li>○ Battery: 3.7V, 350 mAh</li>
            <li>○ Battery type: Lithium-ion</li>
            <li>○ Charging time: 1-2 times a day</li>
            <li>○ Recommended Use: 1-2 times a day</li>
            <li>○ Treatment time: 45-50mW/cm²</li>
            <li>○ LED wavelengths: 5-10 minutes each time</li>
            <li>○ Weight of the device: 45g</li>
            <li>○ Product Model: 1608</li>
          </ul>"
          isOpen={expandedIndex === 3}
          onDropdownClick={() => handleDropdownClick(3)}
          index={3}
        />
        <ProductDetail
          title="INGREDIENTS"
         
         content="Water, Propylene Glycol, Sodium Hyaluronate (2% Hyaluronic Acid), Panthenol (Vitamin B5), Aloe Barbadensis Leaf Juice (Aloe Vera), Tripeptide-1, Butylene Glycol, Phenoxyethanol, Potassium Sorbate, Sodium Benzoate, Dextran, Citric Acid"
         isOpen={expandedIndex === 4}
         onDropdownClick={() => handleDropdownClick(4)}
         index={4}
       />
      </>
    );
  }
}

function SkincareWand2() {
  return (
    <div className="bg-white md:p-6 sm:p-4 p-2 pt-6 pb-0">
      <div className="lg:text-4xl md:text-3xl sm:text-2xl text-xl flex text-black font-light justify-center gap-2 mb-4 md:mb-0">
        <h2 className=""> 1 Device. 5</h2>
        <h2 className="font-semibold"> Glowing </h2>
        <h2 className="">Treatments.</h2>
      </div>

      <div className=" flex justify-center font-light md:p-4 p-0 ">
        <div className="grid md:grid-cols-3 grid-cols-5 gap-4 text-black text-center max-w-[350px] sm:max-w-full">
          <div className="grid-rows-3 md:col-span-1 col-span-2 content-around self-center">
            <div className="md:mb-8 mb-5 sm:mr-0 -mr-2">
              <h2 className="bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Red Light Therapy
              </h2>
              <h2 className="md:text-2xl md:block hidden">
                Reduces fine lines & wrinkles.
              </h2>
              <h2 className="md:hidden text-xs">
                Reduces fine lines <br />& wrinkles.
              </h2>
            </div>
            <div className="md:mb-8 mb-5 sm:mr-0 -mr-2">
              <h2 className="bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Therapeutic Warmth
              </h2>
              <h2 className="md:text-2xl hidden md:block">
                Improves blood flow & boosts <br />
                skin radiance.
              </h2>
              <h2 className="md:hidden text-xs">
                Improves blood flow & <br />
                boosts skin radiance.
              </h2>
            </div>
            <div className="md:mb-8 mb-5 sm:mr-0 -mr-2">
              <h2 className="bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Facial Massage
              </h2>
              <h2 className="md:text-2xl hidden md:block">
                Decreases swelling & puffiness.
              </h2>
              <h2 className="md:hidden text-xs">
                Decreases swelling & <br />
                puffiness.
              </h2>
            </div>
          </div>
          <div className="flex justify-center -mx-8 sm:-mt-0 sm:-mb-0 -mt-2 -mb-0.5 col-span-1">
            <img className="object-contain md:max-h-[42em]" src={wand} />
          </div>
          <div className="grid-rows-3 content-around self-center md:col-span-1 col-span-2">
            <div className="md:mb-8 mb-5 sm:mr-0 -ml-2">
              <h2 className="bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Blue Light Therapy
              </h2>
              <h2 className="md:text-2xl text-xs">
                Kills bacteria & reduces acne/breakouts.
              </h2>
            </div>
            <div className="md:mb-8 mb-5 sm:mr-0 -ml-2">
              <h2 className="bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-0">
                Microcurrent
              </h2>
              <h2 className="md:text-2xl text-xs">
                Stimulates facial muscles
                <br />& tones skin.
              </h2>
            </div>
            <div className="md:mb-8 mb-5 sm:mr-0 -ml-2">
              <h2 className="hidden md:flex bg-accent md:text-2xl justify-center text-sm md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Automatic 5- Minute Timer
              </h2>
              <h2 className="flex md:hidden justify-center bg-accent md:text-2xl text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1">
                Auto 5-Min Timer
              </h2>
              <h2 className="md:text-2xl text-xs">
                Ensures precise & accurate treatment.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reviews({variant}) {
  return variant == '1' ? (
    <div className="flex gap-2 font-light text-base">
      <img src={stars} className="sm:w-30 w-24"></img>
      <h4>Based on 160+ Reviews</h4>
    </div>
  ) : variant == '2' ? (
    <div className="flex md:flex-row font-light flex-col md:gap-4 text-base">
      <div className="flex gap-2">
        <img src={stars} className="sm:w-30 w-24"></img>
        <h4>Based on 80+ Reviews</h4>
      </div>
      <h4>30ml / 1 fl oz.</h4>
    </div>
  ) : (
    <>
      <div className="sm:text-lg text-xs text-secondary uppercase md:tracking-wider tracking-wide font-medium md:mb-2">
        LIMITED TIME OFFER. NO CODE NEEDED
      </div>
      <div className="flex md:flex-row flex-col md:gap-8 font-light text-base">
        <div className="flex gap-3">
          <img src={stars} className="sm:w-30 w-24"></img>
          <h4>Based on 280+ Reviews</h4>
        </div>
        <h4>30ml / 1 fl oz.</h4>
      </div>
    </>
  );
}

const PRODUCT_SELLING_PLAN_FRAGMENT = `#graphql
  fragment SellingPlan on SellingPlan {
    id
    description
    name
    options {
      name
      value
    }
    priceAdjustments {
      adjustmentValue {
        ... on SellingPlanFixedAmountPriceAdjustment {
          adjustmentAmount {
            ...MoneyV2
          }
        }
        ... on SellingPlanFixedPriceAdjustment {
          price {
            ...MoneyV2
          }
        }
        ... on SellingPlanPercentagePriceAdjustment {
          adjustmentPercentage
        }
      }
      orderCount
    }
  }
`;

const MONEY_V2_FRAGMENT = `#graphql
  fragment MoneyV2 on MoneyV2 {
    amount
    currencyCode
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  ${MONEY_V2_FRAGMENT}
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    sellingPlanAllocations(first: 50) {
      nodes {
        sellingPlan {
          ...SellingPlan
        }
        priceAdjustments {
          compareAtPrice {
            ...MoneyV2
          }
          perDeliveryPrice {
            ...MoneyV2
          }
          price {
            ...MoneyV2
          }
        }
      }
    }
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_SELLING_PLAN_FRAGMENT}
  
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;



const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return mergedProducts;
}
