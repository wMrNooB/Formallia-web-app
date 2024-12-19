import React from 'react';
import Product from '../components/Product';
import Review from '../components/Review';
import RelatedProducts from '../components/RelatedProducts';
import Categories from '../components/Categories';
const ProductPage = () => {
  return (
    <>
    <Product />
    <Review />
    <RelatedProducts />
    <Categories title={"Check Out Other Categories"}/>
    </>
  )
}

export default ProductPage;