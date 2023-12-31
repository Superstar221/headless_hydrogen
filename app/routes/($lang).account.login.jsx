import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData, useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';
import {Link, Instagram} from '~/components';

export const handle = {
  isPublic: true,
};

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }

  // TODO: Query for this?
  return json({shopName: 'Hydrogen'});
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
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

  const {session, storefront} = context;

  try {
    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.lang ? `/${params.lang}/account` : '/account', {
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
        'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
    });
  }
};

export const meta = () => {
  return [{title: 'Login'}];
};

export default function Login() {
  const {shopName} = useLoaderData();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <>
      <div className="flex flex-row justify-center md:mb-24 px-4 md:mt-40 mt-4 md:min-h-[50vh] h-[90vh] md:h-auto">
        <div className="max-w-lg w-full justify-center">
          <h1 className="text-4xl lg:text-5xl font-semibold text-center">Sign in</h1>
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
                className={`mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0 focus:ring-0.5 focus:ring-accent`}
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
              <div className='flex justify-between'>
                <p className="mb-2 font-semibold text-xl">Password*</p>
                <Link
                  className="text-md text-black"
                  to="/account/recover"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                className={`mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0 focus:ring-0.5 focus:ring-accent`}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Please enter your password"
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
            <div className="flex-none md:flex items-center justify-between">
              <button
                className="bg-black text-white rounded-full py-2 px-10 focus:shadow-outline block w-auto text-lg uppercase"
                type="submit"
                disabled={!!(nativePasswordError || nativeEmailError)}
              >
                Login
              </button>
              <p className="mb-2 mt-4 md:mb-2 text-lg font-light">
                Don't have an account? &nbsp;
                <Link className="inline underline font-medium" to="/account/register">
                  Sign Up.
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <Instagram className="bg-white"/>
      </div>
    </>
  );
}

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export async function doLogin({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
  }

  /**
   * Something is wrong with the user's input.
   */
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
}
