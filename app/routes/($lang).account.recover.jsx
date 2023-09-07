import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';
import {Link, Instagram} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context}) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return badRequest({
      formError: 'Please provide an email.',
    });
  }

  try {
    await context.storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error) {
    return badRequest({
      formError: 'Something went wrong. Please try again later.',
    });
  }
};

export const meta = () => {
  return [{title: 'Recover Password'}];
};

export default function Recover() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const isSubmitted = actionData?.resetRequested;

  return (
    <>
    <div className="flex justify-center mb-24 px-4 mt-40 font-light">
      <div className="max-w-lg w-full">
        {isSubmitted ? (
          <>
            <h1 className="text-4xl font-semibold lg:text-5xl text-center">Request Sent.</h1>
            <p className="mt-4 font-light mx-4 text-center">
              If that email address is in our system, you will receive an email
              with instructions about how to reset your password in a few
              minutes.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-semibold lg:text-5xl text-center">Forgot Password.</h1>
            <p className="mt-4 font-light mx-4 text-center">
              Enter the email address associated with your account to receive a
              link to reset your password.
            </p>
            {/* TODO: Add onSubmit to validate _before_ submission with native? */}
            <Form
              method="post"
              noValidate
              className="pt-6 pb-8 mt-4 mb-4 space-y-3"
            >
              {actionData?.formError && (
                <div className="flex items-center justify-center mb-6 bg-background rounded-md text-white font-light text-md">
                  <p className="m-4 ">
                    {actionData.formError}
                  </p>
                </div>
              )}
              <div>
                <input
                  className={`mb-1 text-black bg-beige w-full rounded-xl px-4 py-3 border-0`}
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
                  <p className="text-red-500 text-xs">
                    {nativeEmailError} &nbsp;
                  </p>
                )}
              </div>
              <div className="flex-none md:flex items-center justify-between">
                <button
                  className="bg-black text-white rounded-full py-2 px-10 focus:shadow-outline block w-auto text-lg uppercase"
                  type="submit"
                >
                  Request Reset Link
                </button>
                <p className="mb-2 mt-4 md:mb-2 text-lg font-light align-middle">
                  Return to &nbsp;
                  <Link className="inline underline font-medium" to="/account/login">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
      <Instagram className="bg-white"/>
    </>
  );
}

const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
