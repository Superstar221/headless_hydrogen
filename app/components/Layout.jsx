import { useIsHomePath } from '~/lib/utils';
import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
  Banner,
  Instagram,
  IconClose,
} from '~/components';
import { Image } from '@shopify/hydrogen';
import { useParams, Form, Await, useMatches } from '@remix-run/react';
import { useWindowScroll } from 'react-use';
import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { Suspense, useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import Logo from '../styles/Export/logo.png';
import LogoBlack from '../styles/Export/logo-black.png';
import instaLogo from '../styles/Export/icons/ph_instagram-logo-fill.svg'
import facebookLogo from '../styles/Export/icons/ic_baseline-facebook.svg'
import twitterLogo from '../styles/Export/icons/mdi_twitter.svg'
import arrow from '../styles/Export/icons/arrow.svg'
import wand from '../styles/Export/wand3.png'
import wand1 from '../styles/Export/wand.png'
import kit from '../styles/Export/icons/oldReady.png'
import serum from '../styles/Export/serum.png'
import discover from '../styles/Export/icons/discover.svg'
import mastercard from '../styles/Export/icons/mastercard.svg'
import visa from '../styles/Export/icons/visa.svg'
import amex from '../styles/Export/icons/amex.svg'
import bagFilled from '../styles/Export/icons/bag-filled.svg'

export function Layout({ children, layout }) {
  const [oldurl, setOldurl] = useState(null);

  useEffect(() => {    
    const basicUrl = window.location.href.split("?")[0];
    if(oldurl !== basicUrl){
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setOldurl(basicUrl);
    }
  }, [children]);
  
  const isHome = useIsHomePath();
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          title={layout?.shop.name ?? 'Hydrogen'}
          menu={layout?.headerMenu}
        />
        <main role="main" id="mainContent" className={`${isHome
            ? 'text-white bg-black'
            : 'text-black bg-white'
          } flex-grow overflow-x-hidden`}>
          {children}
        </main>
      </div>
      <Footer menu={layout?.footerMenu} />
    </>
  );
}

function Header({ title, menu }) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({ isOpen, onClose }) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Your Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({ isOpen, onClose, menu }) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid overflow-y-scroll h-screen-no-nav transition">
        <div className="flex flex-col px-4 pr-4 gap-2 ">
          <Link
            to='/products/lumin-kit'
            prefetch='intent'
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <div className="grid grid-cols-3 text-center bg-beige rounded-xl transition-all">
              <div className="flex flex-col col-span-2 justify-center pl-5">
                <h4 className="font-medium sm:text-2xl text-xl text-left">Lumin Kit</h4>
                <h4 className="font-light sm:text-xl text-lg text-left">The Perfect Bundle</h4>
              </div>
              <img src={kit} className="aspect-square object-cover align-bottom rounded-r-xl w-full " />
            </div>
          </Link>


          <Link
            to='/products/lumin-elixir'
            prefetch='intent'
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <div className="grid grid-cols-3 text-center bg-beige rounded-xl transition-all">
              <div className="flex flex-col col-span-2 justify-center pl-5">
                <h4 className="font-medium sm:text-2xl text-xl text-left">Lumin Elixir</h4>
                <h4 className="font-light sm:text-xl text-lg text-left">Hyaluronic Serum</h4>
              </div>
              <img src={serum} className="aspect-square object-cover align-bottom rounded-r-xl w-full " />
            </div>
          </Link>
        </div>
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({ menu, onClose }) {
  return (
    <nav className="grid gap-3 p-4 py-3 sm:px-6 sm:py-8 font-medium sm:text-[18px] ">
      {(menu?.items || []).map((item) => (
        <>
          <span key={item.id} className="block">

            <Link
              to={item.to}
              target={item.target}
              onClick={onClose}
            >
              <h3 className="border-t border-accent pt-3">
                {item.title}
              </h3>
            </Link>
          </span>
        </>
      ))}
      <Link
        to="/account/login"
        onClick={onClose}
      >
        <h3 className="border-t border-accent pt-3">
          Account
        </h3>
      </Link>
      <Link
        to=""
        onClick={onClose}
      >
        <h3 className="border-t border-accent pt-3 pb-5">
          VIP
        </h3>
      </Link>
    </nav>
  );
}

function MobileHeader({ title, isHome, openCart, openMenu }) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`bg-white text-black flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8 mt-10 border-b border-beige`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <img className="h-[30px]" src={LogoBlack} />
      </Link>

      <div className="flex items-center justify-end w-full gap-4 pr-0">
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({ isHome, menu, openCart, title }) {
  const params = useParams();
  const { y } = useWindowScroll();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  return (
    <div className=" fixed left-0 z-40 top-0 w-full">
      {isScrolled ? <Banner hide={true} /> : <Banner />}
      <header role="banner" className={`h-[80px]  hidden lg:grid grid-cols-3 items-center w-full leading-none gap-8 px-12 font-medium transition-all duration-0 border-accent bg-white text-black ${isScrolled ? "border-b" : "border-0"}`}>

        <div className="md:flex gap-12 justify-start text-lg">
          <HoverableDiv
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isHovering={isDropdownOpen}
          />
          <Link
            to='/science'
            prefetch='intent'
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            The Science
          </Link>
          <Link
            to='/proof'
            prefetch='intent'
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            The Proof
          </Link>
        </div>

        <div className='flex justify-center'>
          <Link
            to='/'
            prefetch='intent'
          >
            <img className="h-[40px]" src={LogoBlack} />
          </Link>
        </div>

        <div className="flex items-center gap-12 text-lg justify-end">
          <Link
            to='/faqs'
            prefetch='intent'
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            FAQs
          </Link>
          <Link
            to='/account/login'
            prefetch='intent'
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            Account
          </Link>
          <CartCount isHome={isHome} openCart={openCart} />
        </div>
      </header>
    </div>
  );

}

function AccountLink({ className }) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({ isHome, openCart }) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

const HoverableDiv = ({ handleMouseEnter, handleMouseLeave, isHovering }) => {
  return (
    <div className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Link
        to='/collections/frontpage'
        prefetch='intent'
        className={({ isActive }) =>
          isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
        }
      >
        <span>Shop</span>
      </Link>
      <Transition
        show={isHovering}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="fixed w-screen transition-all fadeIn ">
          <div className="mt-7 max-w-screen-lg bg-white drop-shadow-lg rounded-b-xl hidden md:block">
            <div className="grid grid-cols-3 min-w-screen-lg py-8 pl-8">
              <div className="flex flex-col justify-center pr-3">
                <h3 className="font-roman text-lg">
                  Bringing clinical treatments and skincare to your home, minus the 'clinical' costs.
                </h3>
                <Link
                  to='/collections/frontpage'
                  prefetch='intent'
                >
                  <button className="pt-4 uppercase tracking-wider text-lg underline flex ">Shop All</button>
                </Link>
              </div>
              <Link
                to='/products/lumin-kit'
                prefetch='intent'
              >
                <div className="grid grid-cols-2 bg-accent p-4 rounded-xl gap-3">
                  <img src={kit} className="aspect-square object-cover align-bottom max-w-xs w-full rounded-lg " />
                  <div className="flex flex-col justify-center gap-2">
                    <h4 className=" text-lg font-roman">
                      Shop Our New Kit
                    </h4>
                    <p className="text-sm font-light">Save  up to $100 when pairing with our Activating Serum</p>
                    <button className="w-full bg-secondary uppercase p-0 text-white rounded-full font-light tracking-wider">Shop Now</button>
                  </div>
                </div>
              </Link>
              <div className="grid grid-cols-2 px-4 pr-8 gap-4">
                <Link
                  to='/products/lumin-glow'
                  prefetch='intent'
                  className={({ isActive }) =>
                    isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
                  }
                >
                  <div className="flex flex-col text-center hover:bg-accent hover:p-2 rounded-xl transition-all">
                    <img src={wand1} className="aspect-square object-cover align-bottom rounded-xl w-full " />
                    <h4 className=" font-medium text-lg">Lumin Glow</h4>
                    <h4 className="font-light text-base">5-In-1 Skincare Wand</h4>
                  </div>
                </Link>
                <Link
                  to='/products/lumin-elixir'
                  prefetch='intent'
                  className={({ isActive }) =>
                    isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
                  }
                >
                  <div className="flex flex-col text-center hover:bg-accent hover:p-2 rounded-xl transition-all">
                    <img src={serum} className="aspect-square object-cover align-bottom rounded-xl w-full " />
                    <h4 className=" font-medium text-lg">Lumin Elixir</h4>
                    <h4 className="font-light text-base">Hyaluronic Serum</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>



  );
};

const HoverableDiv2 = ({ handleMouseOver, handleMouseOut }) => {
  return (
    <div className="-mt-10 pt-10">
      <div className="fixed transition-all fadeIn mt-7 bg-white drop-shadow-lg rounded-b-xl hidden md:block">
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="grid grid-cols-3 max-w-screen-lg py-8 pl-8">
          <div className="flex flex-col justify-center pr-3">
            <h3 className="font-roman text-lg">
              Bringing clinical treatments and skincare to your home, minus the 'clinical' costs.
            </h3>
            <Link
              to='/collections/frontpage'
              prefetch='intent'
            >
              <button className="pt-4 uppercase tracking-wider text-lg underline flex " onClick={handleMouseOut}>Shop All</button>
            </Link>
          </div>
          <Link
            to='/products/lumin-kit'
            prefetch='intent'
          >
            <div className="grid grid-cols-2 bg-accent p-4 rounded-xl gap-3">
              <img src={wand} className="aspect-square object-cover align-bottom max-w-xs w-full rounded-lg " />
              <div className="flex flex-col justify-center gap-2">
                <h4 className=" text-lg font-roman">
                  Shop Our New Kit
                </h4>
                <p className="text-sm font-light">Save up to $100 when pairing with our Activating Serum</p>
                <button className="w-full bg-secondary uppercase p-0 text-white rounded-full font-light tracking-wider">Shop Now</button>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 px-4 pr-8 gap-4">
            <Link
              to='/products/lumin-glow'
              prefetch='intent'
              className={({ isActive }) =>
                isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
              }
            >
              <div className="flex flex-col text-center hover:bg-accent hover:p-2 rounded-xl transition-all">
                <img src={wand1} className="aspect-square object-cover align-bottom rounded-xl w-full " />
                <h4 className=" font-medium text-lg">Lumin Glow</h4>
                <h4 className="font-light text-base">5-In-1 Skincare Wand</h4>
              </div>
            </Link>
            <Link
              to='/products/lumin-elixir'
              prefetch='intent'
              className={({ isActive }) =>
                isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
              }
            >
              <div className="flex flex-col text-center hover:bg-accent hover:p-2 rounded-xl transition-all">
                <img src={serum} className="aspect-square object-cover align-bottom rounded-xl w-full " />
                <h4 className=" font-medium text-lg">Lumin Elixir</h4>
                <h4 className="font-light text-base">Hyaluronic Serum</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


function Badge({ openCart, dark, count }) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <img src={bagFilled} className="md:hidden block" />
        {/* <IconBag className="md:hidden block"/>  */}
        <div
          className=
          "font-medium subpixel-antialiased hidden md:flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px gap-1 mb-1"
        >
          <p>Cart</p>
          <div className={`bg-black text-white w-7 h-7 rounded-full flex flex-col just-center`}>
            <p className="pt-1">{count || 0}</p>
          </div>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}



function Footer({ menu }) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <div className='z-40 relative bg-accent md:p-4 p-0 font-light text-lg text-white'>
      <div className="flex md:-mt-12 mt-0 z-40 bg-background w-full md:rounded-3xl md:p-20 md:py-14 p-6 justify-center">
        <div className='font-light md:grid md:grid-cols-3 grid-cols-1 max-w-screen-2xl'>
          <div className='md:col-span-2 md:flex grid-cols-1 gap-24'>
            <div className='text-xl font-medium space-y-1.5 md:flex flex-col hidden'>
              <h4 className="text-lg font-light">Shop</h4>
              <Link
                to='/products/lumin-kit'
                prefetch='intent'
              >Lumin Kit</Link>
              <Link
                to='/products/lumin-glow'
                prefetch='intent'
              >Lumin Wand</Link>
              <Link
                to='/products/lumin-elixir'
                prefetch='intent'
              >Lumin Elixir</Link>
              <Link
                to='/collections/frontpage'
                prefetch='intent'
              >Shop All</Link>
            </div>
            <div className='text-xl font-medium space-y-1.5 md:flex flex-col hidden'>
              <h4 className='text-lg font-light'>About</h4>
              <Link
                to='/science'
                prefetch='intent'
                className=""
              >Science</Link>
              <Link
                to='/proof'
                prefetch='intent'
                className=""
              >The Proof</Link>
              <Link
                to='/faqs'
                prefetch='intent'
                className=""
              >FAQs</Link>
            </div>
            <div className="text-xl font-medium space-y-1.5 md:flex flex-col hidden">
              <h4 className="text-lg font-light">Support</h4>
               <Link to="/account/login" prefetch="intent" className="">
                Your Account
              </Link>
              <Link to="/contact" prefetch="intent" className="">
                <div>
                  <span className="text-xl font-medium">Contact</span>
                </div>
              </Link> 
              <Link to="/policies/refund-policy" prefetch="intent" className="">
                <div>
                  <span className="text-xl font-medium">Returns</span>
                </div>
              </Link> 
            </div>


          </div>
          <div className='md:col-span-1 w-full '>
            <div className='hidden md:flex md:text-2xl text-xl items-center mx-auto mb-3 md:space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
              <h3 className='font-medium mr-2 md:mt-4'>Sign Up</h3>
              <h3 className=""> For Exclusive Deals & Goodies</h3>
            </div>
            <div className="block md:hidden gap-0">
              <div className='flex md:text-2xl text-xl items-center mx-auto md:space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
                <h3 className='font-medium mr-2 md:mt-4'>Sign Up</h3>
                <h3 className=""> For Exclusive</h3>
              </div>
              <div className='flex md:text-2xl text-xl items-center mx-auto mb-3 md:space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
                <h3 className="">Deals & Goodies</h3>
              </div>
            </div>
            <p className='font-neue md:text-lg text-base text-beige'>Subscribe and stay up to date with our VIP discounts, Giveaways and 20% off your first purchase!</p>
            <form action="#">
              <div className="flex md:grid md:grid-cols-4 mt-4 items-center md:justify-center mx-auto mb-3 md:space-y-0 space-y-2 w-full sm:flex sm:space-y-0 bg-secondary rounded-lg border border-none sm:rounded-lg focus:ring-0 focus:border-none">
                <div className="relative md:w-full md:col-span-3 w-[80%] ">
                  <label htmlFor="email" className="hidden mb-2 font-medium focus:ring-secondary focus:border-none bg-secondary rounded-lg  sm:rounded-lg ">Email address</label>
                  <input className="block p-3 pl-3 w-full bg-transparent border-0 focus:ring-0 text-white placeholder:text-accent" placeholder="Your Email" type="email" id="email" required="" />
                </div>
                <div className="md:w-full md:col-span-1 w-[20%] md:flex md:justify-end mb-3">
                  <button type="submit" className="py-3 px-5 md:pb-3  font-medium text-center text-accent ">
                    <img src={arrow} />
                  </button>
                </div>
              </div>
            </form>
            <div className="flex gap-2">
              <Link to="https://www.instagram.com/fulfldskin/">
                <img src={instaLogo} className="max-w-[35px] hover:max-w-30" />
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=100090790411901">
                <img src={facebookLogo} className="max-w-[35px] hover:max-w-30" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 mt-4 md:hidden">
            <ProductDetail
              title="Products"
              content="<div class='text-lg font-medium space-y-1.5 grid grid-cols-1'>
                          <div className=''><a href='/products/lumin-kit'>Lumin Kit</div>
                          <div className=''><a href='/products/lumin-glow'>Lumin Wand</div>
                          <div className=''><a href='/products/lumin-elixir'>Lumin Elixir</div>
                          <div className=''><a href='/collections/frontpage'>Shop All</div>
                        </div>"
            />
            <ProductDetail
              title="About"
              content="<div className='text-lg font-medium space-y-1.5 grid grid-cols-1'>
                          <div><a href='/science'>Science</div>
                          <div><a href='/proof'>The Proof</div>
                          <div><a href='/faqs'>FAQs</div>
                        </div>"
            />
            <ProductDetail
              title="Support"
              content="<div className='text-lg font-medium space-y-1.5 grid grid-cols-1'>
                         <div> <a href='/account/login'>Your Account</a></div>
                         <div> <a href='/contact'>  Contact</a> </div>
                         <div><a href='/policies/refund-policy'>Returns</div>
                        </div>
                        "
            />
          </div>
          <div className="col-span-3 py-10 md:block hidden"></div>
          <div className="col-span-1 md:mt-0 mt-4">
            <p className="md:text-base pb-2 text-sm tracking-wide md:text-accent text-secondary">These statements have not been evaluated by the FDA. These products are not intended to diagnose, cure, prevent, or treat any disease. | Contact Info: support@fulfldskin.com<br /></p>
            <h3 className="text-lg md:block hidden">© FULFLD SKIN INC, 2023. All Rights Reserved. | 3465 Platinum Drive, Mississauga ON, L5M 7N4</h3>
          </div>
          <div className="col-span-1 md:col-span-2 justify-center gap-5 pt-6">
            <div className="flex flex-row gap-3 md:justify-end justify-start">
              <img className=" max-h-[12px]" src={visa} />
              <img className=" max-h-[12px]" src={mastercard} />
              <img className=" max-h-[12px]" src={amex} />
              <img className=" max-h-[12px]" src={discover} />
            </div>
            <div className="flex flex-row md:gap-5 sm:gap-3 gap-1 md:justify-end justify-start font-neue text-beige md:text-base text-sm mt-7">
              <Link
                to="/policies/privacy-policy"
                prefetch='intent'
                className="hover:border-b hover:border-beige transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                to="/policies/terms-of-service"
                prefetch='intent'
                className="hover:border-b hover:border-beige transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                to=""
                prefetch='intent'
                className="hover:border-b hover:border-beige transition-all"
              >
                Site Credits
              </Link>
            </div>
            <h3 className="text-sm md:hidden text-secondary mt-3">© FULFLD SKIN INC, 2023. All Rights Reserved. | 3465 Platinum Drive, Mississauga ON, L5M 7N4</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const FooterLink = ({ item }) => {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch='intent'>
      {item.title}
    </Link>
  );
};

function FooterMenu({ menu }) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {/* {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))} */}
    </>
  );
}


function ProductDetail({ title, content, learnMore }) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2 border border-t-accent border-b-0 border-x-0 p-4 px-0">
      {({ open }) => (
        <>
          <Disclosure.Button className="text-left font-neue w-full ">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-y-90 opacity-0"
            enterTo="transform scale-y-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-y-100 opacity-100"
            leaveTo="transform scale-y-90 opacity-0"
          >
            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2 font-neue text-lg w-full'}>
              <div
                className="text-accent w-full"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-accent text-accent"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
