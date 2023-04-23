import { gql } from "@apollo/client";

export type CategoriesType = {
  categories: {
    name: string;
  }[];
};

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      name
    }
  }
`;
