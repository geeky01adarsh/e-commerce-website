import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  CardMedia,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";
import { Title } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { ShoppingBagSharp } from "@mui/icons-material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { ShoppingCartSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../feature/cart-slice";
import { fetchProducts } from "../feature/product-slice";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { selectedCategoryContext } from "../App.jsx";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useContext(
    selectedCategoryContext
  );
  const [searchParams] = useSearchParams();
  const selectedProduct = searchParams.get("search");

  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);
  const { value: products, loading } = state ?? {}; // nullish coalecing

  if (!products?.length) {
    dispatch(fetchProducts());
  }

  const addProduct = (product) => {
    // dispatch an action to add to cart
    dispatch(addToCart({ product, quantity: 1 }));
  };

  let filteredProducts =
    selectedCategory && selectedCategory !== "All"
      ? products.filter((prod) => prod.category === selectedCategory)
      : products;

  filteredProducts = selectedProduct
    ? filteredProducts.filter((prod) =>
    { return prod.title.toLowerCase().includes(selectedProduct);}
      )
    : filteredProducts;

  return (
    <div>
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, image, description, price, rating }) => {
            return (
              <>
                <Grid item key={id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding:theme.spacing(2, 0)
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        alignSelf: "center",
                        width: theme.spacing(30),
                        height: theme.spacing(30),
                        objectFit: "contain",
                        pt: theme.spacing(),
                      }}
                      image={image}
                      alt={title}
                      align="center"
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {title}
                      </Typography>
                      <Typography
                        paragraph
                        color={"text.secondary"}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {description}
                      </Typography>
                      <Typography paragraph fontSize={"large"}>
                        $ {price}
                      </Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                    </CardContent>
                    <CardActions
                      sx={{
                        alignSelf: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>
                          addProduct({
                            title,
                            id,
                            image,
                            description,
                            price,
                            rating,
                          })
                        }
                      >
                        <ShoppingCartCheckout /> Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          }
        )}
      </Grid>
    </div>
  );
};

export default Home;
