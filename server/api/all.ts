export default defineEventHandler(async () => {
  const res = await fetch("https://mazerance-dev-store.myshopify.com/api/2025-01/graphql.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "e7a7d15f91705f127c216aca6796461d",
    },
    body: JSON.stringify({
      query: `query SearchProducts($query: String!, $first: Int!) {
        search(query: $query, first: $first, types: PRODUCT) {
          edges {
            node {
              ... on Product {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 2) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }`,
      variables: { query: "", first: 20 },
    }),
  });

  return res.json();
});
