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

const Home = () => {
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const fetchAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setProducts(result);
    console.log(products);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <Grid container spacing={4}>
        {products.map(({ title, id, image, description, price, rating }) => {
          return (
            <>
              <Grid item key={id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
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
                        "-webkit-line-clamp": "1",
                        "-webkit-box-orient": "vertical",
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography paragraph color={"text.secondary"}
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkit-line-clamp": "2",
                        "-webkit-box-orient": "vertical",
                      }}
                    >
                      {description}
                    </Typography>
                    <Typography paragraph fontSize={"large"}>$ {price}</Typography>
                    <Rating readOnly precision={0.5} value={rating.rate} />
                  </CardContent>
                  <CardActions sx={{
                    alignSelf:"center"
                  }}>
                    <Button variant="contained">
                      <ShoppingCartCheckout/> Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default Home;
