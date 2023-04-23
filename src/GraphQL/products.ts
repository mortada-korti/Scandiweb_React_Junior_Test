import { gql } from "@apollo/client";

export type PriceType = {
  currency: {
    symbol: string;
  };
  amount: string;
};

export type ItemType = {
  id: string;
  value: string;
  displayValue: string;
};

export type AttributeType = {
  id: string;
  name: string;
  type: string;
  items: ItemType[];
};

export type ProductType = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  category: string;
  description: string;
  attributes: AttributeType[];
  prices: PriceType[];
  brand: string;
};

export type CategoryType = {
  category: {
    products: ProductType[];
  };
};

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductByCategory($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        inStock
        gallery
        category
        description
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export type ProductInfoType = {
  product: {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    category: string;
    description: string;
    attributes: {
      id: string;
      name: string;
      type: string;
      items: {
        id: string;
        value: string;
        displayValue: string;
      }[];
    }[];
    prices: {
      currency: {
        symbol: string;
      };
      amount: string;
    }[];
    brand: string;
  };
};

export const GET_PRODUCT_INFO = gql`
  query GetProductInfo($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      category
      description
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
      brand
    }
  }
`;
