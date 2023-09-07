import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {PageHeader, Section, Button} from '~/components';
import invariant from 'tiny-invariant';
import {routeHeaders, CACHE_LONG} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, params, context}) {
  invariant(params.policyHandle, 'Missing policy handle');
  const handle = params.policyHandle;

  const policyName = handle.replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.policy({policy, url: request.url});

  return json(
    {policy, seo},
    {
      headers: {
        'Cache-Control': CACHE_LONG,
      },
    },
  );
}

export default function Policies() {
  const {policy} = useLoaderData();

  return (
    <div className="flex justify-center">
      <Section
        padding="all"
        display="flex"
        className="flex-col items-baseline w-full gap-1 max-w-3xl mb-10"
      >
        <h1 className="lg:text-5xl sm:text-4xl text-3xl font-semibold text-center top-36 mt-20 ">
          {policy.title}
        </h1>
        <div
          dangerouslySetInnerHTML={{__html: policy.body}}
          className="text-black"
        />
      </Section>
    </div>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  query PoliciesQuery(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;
