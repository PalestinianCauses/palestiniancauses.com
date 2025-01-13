// REVIEWED
import { productFragment } from "./product";

export const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
  }
  ${productFragment}
`;
