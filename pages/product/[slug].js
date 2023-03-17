import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import db from "../../utils/db";
import Product from "../../models/Product";

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default function ProductScreen(props) {
  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  const { product } = props;
  if (!product)
    return <Layout title="Product Not Found :/">Product Not Found!</Layout>;

  const addToCartHandler = async () => {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
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
