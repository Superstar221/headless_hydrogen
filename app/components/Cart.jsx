import clsx from 'clsx';
import {useRef} from 'react';
import {useScroll} from 'react-use';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {Disclosure, Listbox} from '@headlessui/react';
import {
  Button,
  Heading,
  IconRemove,
  Text,
  Link,
  FeaturedCollections,
  IconCaret,
  IconCheck,
  IconClose,
  SliderButtons,
} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';
import {useFetcher} from '@remix-run/react';
import {CartAction} from '~/lib/type';
import serum from '../styles/Export/serum.png';
import wand from '../styles/Export/wand.png';
import {FeaturedProductsHorizontal, AddToCartButton} from '~/components';

export function Cart({layout, onClose, cart}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} onClose={onClose} />
    </>
  );
}

export function CartDetails({layout, cart, onClose}) {
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: 'flex flex-col h-[100%] grid-rows-[1fr_auto] justify-between',
    page: 'w-full pb-6 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return (
    <div className={container[layout]}>
      {/* discount={cart.discountCodes} */}
      {cartHasItems && 
        <div className="pb-5 px-4">
          <FreeShipping/>
        </div>
      }
      <CartLines lines={cart?.lines} layout={layout}  items={cartHasItems} className="grow pb-96" onClose={onClose}/>
      {cartHasItems && (
        <div className="bg-accent rounded-t-3xl font-light pb-1.5 absolute bottom-0 left-0 right-0">
          <CartSummary cost={cart.cost} layout={layout}>
            <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
          </CartSummary>
        </div>
      )}
    </div>
  );
}
/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({discountCodes}) {
  const codes = discountCodes?.map(({code}) => code).join(', ') || null;

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button>
                <IconRemove
                  aria-hidden="true"
                  style={{height: 18, marginRight: 4}}
                />
              </button>
            </UpdateDiscountForm>
            <Text as="dd">{codes}</Text>
          </div>
        </div>
      </dl>
      <ProductDetail
        title="Apply Promo Code"
        content={
          <UpdateDiscountForm>
            <div
              className={clsx(
                codes ? 'hidden' : 'flex',
                'items-center justify-between text-copy font-light',
              )}
            >
              <input
                className="text-background border border-secondary w-full bg-transparent rounded-l-md focus:border-accent focus:ring-accent"
                type="text"
                name="discountCode"
                placeholder="Enter Promo code"
              />
              <button className="flex justify-end font-white whitespace-nowrap rounded-r-md bg-background px-4 py-2 text-white hover:bg-white hover:text-black border border-background transition-all">
                Apply
              </button>
            </div>
          </UpdateDiscountForm>
        }
      />
    </>
  );
}

function UpdateDiscountForm({children}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.UPDATE_DISCOUNT}
      />
      {children}
    </fetcher.Form>
  );
}

function CartLines({
  layout = 'drawer',
  lines: cartLines,
  discount,
  items,
  onClose,
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow md:translate-y-4 '
      : 'px-4 sm-max:pt-2 overflow-y-scroll h-screen-no-nav transition md:px-6 h-full pb-[40vh]',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <ul className="grid gap-3 md:gap-10">
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line} onClose={onClose} />
        ))}
      </ul>
      {/* <CartUpsell lines={cartLines} onClose={onClose} /> */}
      {items && <CartDiscounts discountCodes={discount} />}
    </section>
  );
}

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="sm:mt-2 mt-0 w-full bg-background flex rounded-full justify-center">
      <a href={checkoutUrl} target="_self">
        <button className=" font-roman uppercase text-center py-3 px-6 bg-background text-white justify-center tracking-wider sm:text-base text-sm">
          Continue to Checkout
        </button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({cost, layout, children = null}) {
  const summary = {
    drawer: 'grid gap-4 sm:p-6 p-4 pb-2 md:px-8',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  return (
    <section aria-labelledby="summary-heading" className={summary[layout]}>
      <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>
      <dl className="grid ">
        <div className="flex justify-center w-full sm:text-lg text-sm self-center md:gap-2 gap-1 font-roman border-b border-b-black pb-2 mb-2">
          <span>30 Day Trial</span>
          <span>•</span>
          <span>1 Year Warranty</span>
          <span>•</span>
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center justify-between font-roman">
          <Text as="dt">Subtotal</Text>
          <Text as="dd" data-test="subtotal" className="font-semibold">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
        <div className="sm:text-md text-sm">
          <Text as="span" className="text-md">
            Taxes and{' '}
          </Text>
          <Link to="/policies/shipping-policy">
            <Text as="span" className="underline font-roman ">
              shipping
            </Text>
          </Link>
          <Text as="span" className="text-md">
            {' '}
            calculated at checkout
          </Text>
        </div>
      </dl>
      {children}
    </section>
  );
}

function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure
      key={title}
      as="div"
      className="grid w-full gap-2 border border-black p-2 pb-2 mt-3"
    >
      {({open}) => (
        <>
          <Disclosure.Button className="text-left text-black">
            <div className="flex justify-between">
              <h3 className="sm:text-base text-sm font-roman">{title}</h3>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-2 pt-2 grid gap-2'}>
            {content}
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function CartLineItem({line, onClose}) {
  if (!line?.id) return null;

  const {id, quantity, merchandise, sellingPlanAllocation} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex gap-4">
      <div className="w-24 h-24 aspect-square border rounded-lg md:w-28 md:h-28">
        {merchandise.image && (
          <Image
            data={merchandise.image}
            className="object-cover object-center w-24 h-24 aspect-square border rounded md:w-28 md:h-28"
            alt={merchandise.title}
          />
        )}
      </div>

      <div className="flex justify-between font-light">
        <div className="grid gap-1 font-semibold">
          <Heading as="h3" size="copy">
            {merchandise?.product?.handle ? (
              <Link
                to={`/products/${merchandise.product.handle}`}
                onClick={onClose}
              >
                {merchandise?.product?.title || ''}
              </Link>
            ) : (
              <Text>{merchandise?.product?.title || ''}</Text>
            )}
          </Heading>

          <div className="grid pb-1 text-sm font-light">
            {(merchandise?.selectedOptions || []).map((option) => (
              <h3 key={option.name}>
                {option.name}: {option.value}
              </h3>
            ))}
            {sellingPlanAllocation && (
              <h3>{sellingPlanAllocation.sellingPlan.name}</h3>
            )}
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="flex justify-start">
                <CartLineQuantityAdjust line={line} />
              </div>
              <ItemRemoveButton lineIds={[id]} />
            </div>
            <Text>
              <CartLinePrice line={line} as="span" />
            </Text>
          </div>
        </div>
      </div>
    </li>
  );
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.REMOVE_FROM_CART}
      />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button
        className="flex items-center justify-center sm:w-10 sm:h-10 h-6 w-6 border rounded"
        type="submit"
      >
        <span className="sr-only">Remove</span>
        <IconRemove aria-hidden="true" />
      </button>
    </fetcher.Form>
  );
}

function CartLineQuantityAdjust({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border rounded">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="sm:w-10 sm:h-10 h-6 w-6 transition text-black hover:text-accent disabled:text-accent"
            value={prevQuantity}
            disabled={quantity <= 1}
          >
            <span>&#8722;</span>
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center" data-test="item-quantity">
          {quantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="sm:w-10 sm:h-10 h-6 w-6 transition text-black hover:text-accent"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function UpdateCartButton({children, lines}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.UPDATE_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {children}
    </fetcher.Form>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <Money
      withoutTrailingZeros
      {...passthroughProps}
      data={moneyV2}
      className="sm:text-2xl"
    />
  );
}

export function CartEmpty({hidden = false, layout = 'drawer', onClose}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: clsx([
      'content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-6 h-screen-no-nav md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  return (
    <div ref={scrollRef} className={container[layout]} hidden={hidden}>
      <section className="grid gap-4 font-light">
        <h3 className="text-center text-xl">Your cart is currently empty.</h3>
        <div>
          <Link to="/collections/frontpage">
            <Button
              onClick={onClose}
              className="w-full font-roman border border-background p-2 px-6 transition-all uppercase hover:bg-background hover:text-white"
            >
              Shop All
            </Button>
          </Link>
        </div>
      </section>
      <section className="grid gap-8 pt-4">
        <FeaturedProductsHorizontal
          count={4}
          heading="Shop Our Best Sellers!"
          layout={layout}
          onClose={onClose}
          sortKey="BEST_SELLING"
        />
      </section>
    </div>
  );
}

export function CartUpsell({
  hidden = false,
  layout = 'drawer',
  lines: cartLines,
  onClose,
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: clsx(['gap-4 transition md:gap-12']),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  if (currentLines.length == 1) {
    return (
      <div ref={scrollRef} className={container[layout]} hidden={hidden}>
        <CartLineItem1
          key={currentLines[0].id}
          line={currentLines[0]}
          onClose={onClose}
        />
      </div>
    );
  }
}

function CartLineItem1({line, onClose}) {
  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  const firstVariant = 'gid://shopify/ProductVariant/45047889821993';

  const productAnalytics = {
    productGid: 'gid://shopify/Product/8277727805737',
    variantGid: 'gid://shopify/ProductVariant/45047889821993',
    name: 'Lumin Glow Wand & Lumin Elixir Activating Serum Kit',
    price: 199.0,
    quantity: 1,
  };

  if (merchandise?.product?.handle == 'lumin-elixir') {
    return (
      <div className="mt-2">
        <h3 className=" tracking-wider font-light text-center mb-2">
          LIMITED TIME OFFER:
        </h3>
        <div className="flex gap-3">
          <img
            src={wand}
            className="w-28 h-28 object-cover object-center aspect-square rounded-lg"
          />
          <div className="flex-grow col-span-2 h-full">
            <Link
              to="/products/lumin-glow"
              prefetch="intent"
              className="flex flex-col justify-between"
              onClick={onClose}
            >
              <div>
                <h3 className="sm:text-xl text-lg font-semibold">Lumin Glow</h3>
                <h3 className="sm:text-xl text-lg font-semibold -mt-2 ">
                  Skincare Wand
                </h3>
                <h5 className="sm:text-sm text-xs font-medium">
                  With Red+Blue Light Therapy
                </h5>
              </div>
              <div className="flex justify-between mt-3">
                <button className="bg-accent px-8 py-1 rounded-full font-neue text-sm">
                  BUY NOW
                </button>
                <h5 className="font-neue">$199.00</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (merchandise?.product?.handle == 'lumin-glow') {
    return (
      <div className="mt-2">
        <h3 className=" tracking-wider font-light text-center mb-2">
          LIMITED TIME OFFER:
        </h3>
        <div className="flex gap-3 ">
          <img
            src={serum}
            className="w-28 h-28 object-cover object-center aspect-square rounded-lg"
          />
          <div className="w-full h-full">
            <Link
              to="/products/lumin-elixir"
              prefetch="intent"
              className="flex flex-col justify-between"
              onClick={onClose}
            >
              <div>
                <h3 className="sm:text-xl text-lg font-semibold ">
                  Lumin Elixir
                </h3>
                <h3 className="sm:text-xl text-lg font-semibold -mt-2 ">
                  Activating Serum
                </h3>
                <h5 className="sm:text-base text-sm font-medium">
                  Subscribe & get 10% OFF each month.
                </h5>
              </div>
              <div className="flex justify-between mt-1">
                <button className="bg-accent px-3 sm:px-6 py-1 rounded-full font-neue text-sm">
                  SUBSCRIBE
                </button>
                <h5 className="font-neue">$49.00</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

function FreeShipping() {
  return (
    <div className="p-0 sm:px-6">
      <div className="flex flex-row gap-3 justify-center">
        <h3 className="font-neue sm:text-base text-sm">
          Congrats! You got free shipping.
        </h3>
        <Link to="/policies/shipping-policy" prefetch="intent" className=" font-neue sm:text-base text-sm underline text-accent">
          See terms
        </Link>
      </div>
      <div className="mt-2 h-2 w-full bg-green-500 rounded-full"></div>
    </div>
  );
}
