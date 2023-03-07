import { useTheme } from "@emotion/react";
import { HandymanOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSubtotal } from "../../utils/cart-utils";
import { addToCart, removeFromCart } from "../feature/cart-slice";
// import { cartItems } from '../../utils/cart-utils.js';

function Cart() {
  const cartItems = useSelector((state) => state.cart?.value);
  const theme = useTheme();
  const subTotal = getSubtotal(cartItems)?.toFixed(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantity = (e, { product, quantity }) => {
    const newQuantity = e.target.valueAsNumber;
    if (newQuantity < quantity) {
      dispatch(removeFromCart({product}))
    }
    else {
      dispatch(addToCart({ product }));
    }
  }

  const gotoHome = () => {
    navigate('/')
  }
    
  const goToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cartItems.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          label="Quantity"
                          sx={{
                            width: theme.spacing(8),
                          }}
                          type="number"
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          value={quantity}
                          onChange={(e)=>handleQuantity(e, {product, quantity})}
                        />
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        $ {getSubtotal([{ product, quantity }]).toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Card
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4">Subtotal</Typography>
              <Typography variant="h5">$ {subTotal} </Typography>
              {subTotal > 0 ? (
                <Button variant="contained" onClick={goToCheckout}>Buy now</Button>
              ) : (
                <Button variant="contained" onClick={gotoHome}>Shop Something</Button>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
