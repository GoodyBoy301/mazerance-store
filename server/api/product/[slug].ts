export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product slug is required",
    });
  }

  try {
    const res = await fetch("https://mazerance-dev-store.myshopify.com/api/2025-01/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "e7a7d15f91705f127c216aca6796461d",
      },
      body: JSON.stringify({
        query: `query GetProduct($handle: String!) {
          product(handle: $handle) {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            productType
            tags
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            options {
              id
              name
              values
            }
            rarity: metafield(namespace: "custom", key: "rarity_score") {
              value
            }
            productNotes: metafield(namespace: "custom", key: "product_notes") {
              value
            }
          }
        }`,
        variables: { handle: slug },
      }),
    });

    const result = await res.json();

    return {
      data: result.data,
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch product data",
    });
  }
});
