import { useNavigate, useParams } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { CategoryType, GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/products";

// Components
import Card from "../../components/card/Card";

// Styles
import { PageContainer } from "../../shared/style";
import { CategoryTitle, ProductsContainer } from "./style";
import NotFound from "../notFound/NotFound";
import { useEffect, useState } from "react";
import { Skeleton, Stack } from "@mui/material";

const Category = () => {
  const { category } = useParams();

  // GraphQL
  const { loading, error, data } = useQuery<CategoryType>(
    GET_PRODUCTS_BY_CATEGORY,
    { variables: { category: category } }
  );
  const skeletonData = Array.from({ length: 9 });

  if (data?.category === null) return <NotFound />;
  return (
    <PageContainer>
      {loading ? (
        <Skeleton
          animation='wave'
          sx={{ marginBottom: "80px", height: "80px", width: "200px" }}
        />
      ) : (
        <CategoryTitle>{category}</CategoryTitle>
      )}
      {loading ? (
        <ProductsContainer>
          {skeletonData.map((item, index) => (
            <Stack key={index}>
              <Skeleton
                animation='wave'
                variant='rectangular'
                width='354px'
                height='330px'
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton height='40px' animation='wave' />
              <Skeleton height='40px' animation='wave' />
            </Stack>
          ))}
        </ProductsContainer>
      ) : (
        <ProductsContainer>
          {data?.category.products.map((product, index) => (
            <Card
              key={index}
              name={product.name}
              id={product.id}
              inStock={product.inStock}
              gallery={product.gallery}
              prices={product.prices}
              category={product.category}
              brand={product.brand}
              attributes={product.attributes}
              description={product.description}
            />
          ))}
        </ProductsContainer>
      )}
    </PageContainer>
  );
};

export default Category;
