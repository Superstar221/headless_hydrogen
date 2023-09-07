import i1 from '../styles/Export/Arrow-1.png'
import React, { useState } from 'react';
import {redirect, json} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {getInputStyleClasses} from '~/lib/utils';
import {Link, Instagram} from '~/components';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');

  if (
    !email ||
    typeof email !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide an email',
    });
  }

  try {
    const data = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input : {
          acceptsMarketing: true,
          email,
          emailMarketingConsent: {
            "consentUpdatedAt": "",
            marketingOptInLevel: "SINGLE_OPT_IN",
            marketingState: "SUBSCRIBED"
          },
        },
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
    }

    // const customerAccessToken = await doLogin(context, {email, password});
    // session.set('customerAccessToken', customerAccessToken);
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We could not sign up to the newslettter with this email. Email might already exist, try to use another email instead.',
    });
  }
};

export function Newsletter(){
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);

    return(
        <div className="md:m-16 sm:m-4 m-0 w-full flex justify-center max-w-screen-xl">
            <div className="grid md:grid-cols-2 grid-cols-1 justify-center bg-background sm:rounded-lg md:p-16 p-8 font-light w-full  ">
                <div className=''>
                    <div className="flex gap-1 md:text-4xl text-2xl md:justify-start justify-center">
                        <h2 className="font-light">Sign Up for</h2>
                        <h2 className="font-semibold">Exclusive</h2>
                    </div>
                    <div className="flex md:text-4xl text-2xl md:justify-start justify-center">
                        <h2 className="font-light">Deals & Goodies</h2>
                    </div>
                    <div className="mt-2 md:mr-16 mr-0 md:text-left md:text-xl text-center">
                        Subscribe and stay up to date with our VIP discounts, Giveaways and 20% off your first purchase!
                    </div>
                </div>

                <div className="md:pl-[10%] pl-0 ">
                    <form action="#">
                        <div className="p-1 bg-white border-black text-black w-full my-2 rounded-md">
                            <div className="relative w-full ">
                                <label htmlFor="email" className="hidden mb-2 font-medium focus:ring-secondary focus:border-none bg-white rounded-lg  sm:rounded-lg ">Email address</label>
                                <input className="block p-3 pl-3 w-full bg-transparent border-0 focus:ring-0 text-black placeholder:text-secondary" 
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  required
                                  placeholder="Email address"
                                  aria-label="Email address"
                                />
                            </div>
                        </div>
                        <div className="">
                            <button type="submit" className="p-5 bg-secondary text-white w-full rounded-md border-white border flex justify-between">SEND MY DISCOUNT
                                <div className="mt-[6px] max-h-30 align-self-middle">
                                    <img src={i1} alt="" />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}


const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
