import React, { useContext } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import data from "@/utils/data";
import { Store } from "@/utils/store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((item) => item.slug === slug);
  if (!product) return <div>Product not Found!</div>;

  const addToCartHandler = () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Sorry, Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div>
      <Layout title={product.name}>
        <div className="py-2">
          <Link href="/">Back To Products page</Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} Reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="p-5 card">
              <div className="flex justify-between mb-2">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="flex justify-between mb-2">
                <div>Status</div>
                <div>
                  ${product.countInStock > 0 ? "In stock" : "Unavailable"}
                </div>
              </div>
              <button
                className="w-full primary-button"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
