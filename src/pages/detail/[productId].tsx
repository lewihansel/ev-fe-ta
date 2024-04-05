import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Product } from "@/models/Product";
import { fetchProductById } from "@/api/Product";
import styles from "@/styles/ProductDetail.module.scss";
import { useCartStore } from "@/store/cart";
import { useCallback } from "react";

export default function ProductDetail({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const cartStore = useCartStore();
  const onAddToCart = useCallback(() => {
    cartStore.addProductTocart(product);
  }, [cartStore, product]);

  const onRemoveFromCart = useCallback(() => {
    cartStore.removeProductFromcart(product);
  }, [cartStore, product]);

  return (
    <>
      <Head>
        <title>{`${product?.title} | Brown Commerce App`}</title>
        <meta
          name="description"
          content={`${product.title} | ${product.description}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="product detail" className={`${styles.productDetailContainer}`}>
        <img
          src={product.image}
          alt={`${product.title}`}
          className={`${styles.productImage}`}
        />
        <div className={`${styles.productInfo}`}>
          <h1 className={`${styles.productTitle}`}>{product.title}</h1>
          <div className={`${styles.productPriceContainer}`}>
            <p className={`${styles.productPrice}`}>{product.price}</p>
            <button
              onClick={onAddToCart}
              className={`${styles.addToCartButton}`}
            >
              Add To Cart
            </button>
          </div>
          {cartStore.getProductQuantity(product) > 0 && (
            <div className={`${styles.productCartCount}`}>
              <p>{`${cartStore.getProductQuantity(
                product
              )} product(s) in cart`}</p>
              <button
                onClick={onRemoveFromCart}
                className={`${styles.removeFromCartBtn}`}
              >
                remove from cart
              </button>
            </div>
          )}
          <p className={`${styles.productDescription}`}>
            {product.description}
          </p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = (async ({ params }) => {
  const product: Product = await fetchProductById({
    productId: params?.productId as string,
  });
  return { props: { product } };
}) satisfies GetServerSideProps<{ product: Product }>;
