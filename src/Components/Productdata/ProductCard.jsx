import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Grid2,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsCard = (props) => {
  const { productsData } = props;
  const [updatedProductsArr, setUpdatedProductsArr] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoryArr, setCategoryArr] = useState([]);

  const filterProducts = (categoryProduct) => {

    const filterByCategory = products.filter(
      (item) => item.category.name === categoryProduct.value
    );

    setUpdatedProductsArr(filterByCategory);
    console.log(filterByCategory, 'filterByCategory');
    
  };
  useEffect(() => {
    const productsData = axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((data) => {
        const filterData = data?.data?.filter(
          (products) =>
            products?.title !== "New Product" &&
            products.title !== "Giày" &&
            products.title !== "Coat" &&
            products.title !== "Itachi" &&
            products.title !== "JOSE LUIS" &&
            products.title !== "JOSE LUIS" &&
            products.title !== "sdfsd" &&
            products.title !== "New Product AIT" &&
            products.title !== "Strapi External APIs Integration Plugin" &&
            products.title !== "product"
        );
        const categoryArr = filterData.map((item) => {
          return {
            label: item.category.name,
            value: item.category.name,
          };
        });

        const uniqueData = categoryArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.value === item.value)
        );
        setCategoryArr(uniqueData);
        setProducts(filterData);
        setUpdatedProductsArr(filterData);
        setIsLoadingData(false);
      });
  }, []);
  return (
    <>
      <Autocomplete
        disablePortal
        options={categoryArr}
        sx={{ width: 300 }}
        onChange={(e, newValue) => {
          filterProducts(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Grid container spacing={3}>
        {isLoadingData ? (
          <Box className="text-center w-100 mt-4">
            <CircularProgress size={40} />
          </Box>
        ) : (
          updatedProductsArr?.map((product, index) => (
            <Grid item sm={3}>
              <Card key={index} className="p-3 rounded-3">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={false}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {product?.images?.map((img) => {
                    return (
                      <SwiperSlide>
                        <img
                          className="card-image img-fluid rounded-2"
                          src={img}
                          alt="Product img"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <Typography variant="body2" className="mt-2">
                  {product?.category.name}
                </Typography>
                <Typography variant="body1">{product.title}</Typography>
                <Rating name="read-only" value={product.Rating} readOnly />
                <Box className="d-flex justify-content-between align-items-center">
                  <Typography>${product?.price}</Typography>
                  <Button size="small" variant="contained">
                    <AddIcon /> ADD
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};
export default ProductsCard;