// REVIEWED
export type Edge<T> = {
  node: T;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
};

export type PriceRange = {
  minVariantPrice: Money;
  maxVariantPrice: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: Image;
  images: Connection<Image>;
  availableForSale: boolean;
  options: ProductOption[];
  variants: Connection<ProductVariant>;
  tags: string[];
  priceRange: PriceRange;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: { handle: string };
};

export type ShopifyProductsOperation = {
  data: { products: Connection<ShopifyProduct> };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  images: Image[];
  variants: ProductVariant[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: CartProduct;
  };
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  lines: Connection<CartItem>;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    totalTaxAmount: Money;
    subtotalAmount: Money;
  };
};

export type ShopifyCartOperation = {
  data: { cart: ShopifyCart };
  variables: { cartId: string };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyInsertToCartOperation = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};
