import {
  Toolbar,
  Typography,
  AppBar,
  IconButton,
  Badge,
  Box,
  Button,
  styled,
  alpha,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getItemCount } from "../../utils/cart-utils";
import { fetchAllCategories } from "../feature/category-slice";
import { useContext } from "react";
import { selectedCategoryContext } from "../App.jsx";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));
const SearchBar = () => {
  const theme = useTheme();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const params = useParams('search')
  const history = useNavigate();
  const [search, setSearch] = useState();


  const [selectedCategory, setSelectedCategory] = useContext(
    selectedCategoryContext
  );
  if (!categories.length) {
    dispatch(fetchAllCategories());
  }

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    await setSelectedCategory(value); 
  };

  const handleSearch = (e, value) => {
    if (!value) {
      history('/');
      return;
    }
    let { label } = value;
    label = label.toLowerCase();
    setSearch(label);

    history(`/?search=${label}`);
  }


  const StyleAutoComplete = styled(Autocomplete)(({ theme }) => ({
    color: 'inherit',
    width: "100%",
    "& .MuiTextField-root": {
      paddingRight: `calc(1em+${theme.spacing(4)})`,
    },
    "& .MuiInputBase-input": {
      color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border:"none",
    },
  }))


  

  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              fill: theme.palette.common.white,
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem value={"All"}>All</MenuItem>
        {categories?.map((cat) => (
          <MenuItem sx={{ textTransform: "capitalize" }} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </Select>
      <StyleAutoComplete
        onChange={(e, value) => handleSearch(e, value)}
        freeSolo
        disablePortal
        id="combo-box-demo selected-product"
        options={Array.from(
          selectedCategory == "All"
            ? products
            : products.filter((product) => {
                return product.category === selectedCategory;
              }),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={search?search:"Products"} />}
      />
    </Search>
  );
};

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.value);
  const cartItemsCount = getItemCount(cartItems);
  const theme = useTheme();
  const navigate = useNavigate();

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

  return (
    <AppBar position="sticky" sx={{ py: 1 }}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h6" color="inherit">
            <StyledLink to="/">eComm</StyledLink>
           
        </Typography>
        <SearchBar />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <IconButton
              size="large"
              aria-label="app icon"
              color="inherit"
              sx={{ fill: "inherit", color: "white" }}
            >
              <Badge badgeContent={cartItemsCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Box>
        <Button color="inherit" onClick={()=>navigate('/login')}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
