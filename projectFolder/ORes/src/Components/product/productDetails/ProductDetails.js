import styles from "./ProductDetails.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import spinnerImg from "../../../Assets/spinner.png"

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };


  /*card details temp const*/
  const  detail = "Owner", message = "Wanna sell this item.";


  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}> <b>Price </b>{`$${product.price}`}</p>
                
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <p>
                  <b>Id</b> {product.id}
                </p>

                <p> <b>About </b>{product.desc}</p>
                
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-primary"
                  onClick={() => addToCart(product)}
                >
                  ADD TO WISH
                </button>


                {/* Card details of product owner contact */}
                <h4>Owner details:</h4>
                <li className={`${styles.pcard} `}>
                  {/* <img className={styles.avatar} src={url} alt="profile photo" /> */}
                  <div className={styles.info}>
                    <h1 className={styles.name}>Name: {product.ownerName}</h1>
                    <p className={styles.company}>Status: {detail}</p>
                    <p className={styles.title}>Phone: {product.ownerPhone}</p>
                    <p className={styles.email}>email: {product.ownerEmail}</p>
                    <p className={styles.message}>message: {message}</p>
                  </div>

                </li>

              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
