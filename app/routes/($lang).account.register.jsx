import {redirect, json} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';
import {doLogin} from './($lang).account.login';
import {Link, Instagram} from '~/components';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    });
  }

  try {
    const data = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password},
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
    }

    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
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
        'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
    });
  }
};

export const meta = () => {
  return [{title: 'Register'}];
};

export default function Register() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <>
      <div className="flex justify-center mb-24 px-4 md:mt-40 mt-4 md:min-h-[50vh] h-[90vh] md:h-auto">
        <div className="max-w-lg w-full">
          <h1 className="text-4xl font-semibold lg:text-5xl text-center">Create an Account.</h1>
          {/* TODO: Add onSubmit to validate _before_ submission with native? */}
          <Form
            method="post"
            noValidate
            className="pt-6 pb-8 mt-4 mb-4 space-y-3 font-light"
          >
            {actionData?.formError && (
              <div className="mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0">
                <p className="m-4">{actionData.formError}</p>
              </div>
            )}
            <div>
              <p className="mb-2 font-semibold text-xl">Email*</p>
              <input
                className={`mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0 focus:ring-0.5 focus:ring-accent `}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onBlur={(event) => {
                  setNativeEmailError(
                    event.currentTarget.value.length &&
                      !event.currentTarget.validity.valid
                      ? 'Invalid email address'
                      : null,
                  );
                }}
              />
              {nativeEmailError && (
                <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
              )}
            </div>
            <div>                
              <p className="mb-2 font-semibold text-xl">Password*</p>
              <input
                className={`mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0 focus:ring-0.5 focus:ring-accent`}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                minLength={8}
                required
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onBlur={(event) => {
                  if (
                    event.currentTarget.validity.valid ||
                    !event.currentTarget.value.length
                  ) {
                    setNativePasswordError(null);
                  } else {
                    setNativePasswordError(
                      event.currentTarget.validity.valueMissing
                        ? 'Please enter a password'
                        : 'Passwords must be at least 8 characters',
                    );
                  }
                }}
              />
              {nativePasswordError && (
                <p className="text-red-500 text-xs">
                  {' '}
                  {nativePasswordError} &nbsp;
                </p>
              )}
            </div>
            <div className="flex-none md:flex items-center justify-between align-middle">
              <button
                className="bg-black text-white rounded-full py-2 px-10 focus:shadow-outline block w-auto text-lg uppercase"
                type="submit"
                disabled={!!(nativePasswordError || nativeEmailError)}
              >
                Sign Up
              </button>
              <p className="mb-2 mt-4 md:mb-2 md:mt-0 text-lg font-light align-middle">
                Already have an account? &nbsp;
                <Link className="inline underline font-medium" to="/account/login">
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <Instagram className="bg-white"/>
    </>
  );
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
