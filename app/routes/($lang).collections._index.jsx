import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  Grid,
  Heading,
  PageHeader,
  Section,
  Link,
  Pagination,
  getPaginationVariables,
  Button,
} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {CACHE_SHORT, routeHeaders} from '~/data/cache';
import {Image} from '@shopify/hydrogen';

const PAGINATION_SIZE = 8;

export const headers = routeHeaders;

import {redirect} from '@shopify/remix-oxygen';

export async function loader({params}) {
  return redirect(params?.lang ? `${params.lang}/collections/frontpage` : '/collections/frontpage');
}


// export const loader = async ({request, context: {storefront}}) => {
//   const variables = getPaginationVariables(request, PAGINATION_SIZE);
//   const {collections} = await storefront.query(COLLECTIONS_QUERY, {
//     variables: {
//       ...variables,
//       country: storefront.i18n.country,
//       language: storefront.i18n.language,
//     },
//   });

//   const seo = seoPayload.listCollections({
//     collections,
//     url: request.url,
//   });

//   return json(
//     {collections, seo},
//     {
//       headers: {
//         'Cache-Control': CACHE_SHORT,
//       },
//     },
//   );
// };

// export default function Collections() {
//   const {collections} = useLoaderData();

//   return (
//     <>
//       <PageHeader heading="Collections" />
//       <Section>
//         <Pagination connection={collections}>
//           {({
//             endCursor,
//             hasNextPage,
//             hasPreviousPage,
//             nextPageUrl,
//             nodes,
//             prevPageUrl,
//             startCursor,
//             nextLinkRef,
//             isLoading,
//           }) => (
//             <>
//               {hasPreviousPage && (
//                 <div className="flex items-center justify-center mt-6">
//                   <Button
//                     to={prevPageUrl}
//                     variant="secondary"
//                     width="full"
//                     prefetch="intent"
//                     disabled={!isLoading}
//                     state={{
//                       pageInfo: {
//                         endCursor,
//                         hasNextPage,
//                         startCursor,
//                       },
//                       nodes,
//                     }}
//                   >
//                     {isLoading ? 'Loading...' : 'Previous products'}
//                   </Button>
//                 </div>
//               )}
//               <Grid
//                 items={nodes.length === 3 ? 3 : 2}
//                 data-test="collection-grid"
//               >
//                 {nodes.map((collection, i) => (
//                   <CollectionCard
//                     collection={collection}
//                     key={collection.id}
//                     loading={getImageLoadingPriority(i, 2)}
//                   />
//                 ))}
//               </Grid>
//               {hasNextPage && (
//                 <div className="flex items-center justify-center mt-6">
//                   <Button
//                     ref={nextLinkRef}
//                     to={nextPageUrl}
//                     variant="secondary"
//                     width="full"
//                     prefetch="intent"
//                     disabled={!isLoading}
//                     state={{
//                       pageInfo: {
//                         endCursor,
//                         hasPreviousPage,
//                         startCursor,
//                       },
//                       nodes,
//                     }}
//                   >
//                     {isLoading ? 'Loading...' : 'Next products'}
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </Pagination>
//       </Section>
//     </>
//   );
// }

// function CollectionCard({collection, loading}) {
//   return (
//     <Link to={`/collections/${collection.handle}`} className="grid gap-4">
//       <h2>Test</h2>
//       <div className="card-image bg-primary/5 aspect-[3/2]">
//         {collection?.image && (
//           <Image
//             data={collection.image}
//             aspectRatio="6/4"
//             sizes="(max-width: 32em) 100vw, 45vw"
//             loading={loading}
//           />
//         )}
//       </div>
//       <Heading as="h3" size="copy">
//         {collection.title}
//       </Heading>
//     </Link>
//   );
// }

// const COLLECTIONS_QUERY = `#graphql
//   query Collections(
//     $country: CountryCode
//     $language: LanguageCode
//     $first: Int
//     $last: Int
//     $startCursor: String
//     $endCursor: String
//   ) @inContext(country: $country, language: $language) {
//     collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
//       nodes {
//         id
//         title
//         description
//         handle
//         seo {
//           description
//           title
//         }
//         image {
//           id
//           url
//           width
//           height
//           altText
//         }
//       }
//       pageInfo {
//         hasPreviousPage
//         hasNextPage
//         startCursor
//         endCursor
//       }
//     }
//   }
// `;
