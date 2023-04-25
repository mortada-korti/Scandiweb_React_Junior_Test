import { useParams } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { CategoryType, GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/products";

// Components
import Card from "../../components/card/Card";

// Pages
import NotFound from "../notFound/NotFound";

// @mui
import { Skeleton, Stack } from "@mui/material";

// Styles
import { PageContainer } from "../../shared/style";
import { CategoryTitle, ProductsContainer } from "./style";

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
          sx={{ marginBottom: "80px", height: "80px" }}
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
            <Card key={index} product={product} />
          ))}
        </ProductsContainer>
      )}
    </PageContainer>
  );
};

export default Category;
