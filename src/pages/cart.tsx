import Head from "next/head";
import { useCallback } from "react";
import { Product } from "@/models/Product";
import { useCartStore } from "@/store/cart";
import styles from "@/styles/CartPage.module.scss";

export default function CartPage() {
  const cartStore = useCartStore();

  const onAddQuantity = useCallback(
    (product: Product) => {
      cartStore.incrementProductIncart(product);
    },
    [cartStore]
  );

  const onDecrementQuantity = useCallback(
    (product: Product) => {
      cartStore.decrementProductIncart(product);
    },
    [cartStore]
  );

  const onRemoveItemFromCart = useCallback(
    (product: Product) => {
      cartStore.removeProductFromcart(product);
    },
    [cartStore]
  );

  return (
    <>
      <Head>
        <title>{`Order Total: $${cartStore.totalPrice} | Brown Commerce App`}</title>
        <meta
          name="description"
          content={`Order Total: $${cartStore.totalPrice} | Brown Commerce App`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.cartPageContainer}`}>
        <div className={`${styles.cartPageTitle}`}>
          <p>Order total:</p>
          <p>{`$${cartStore.totalPrice.toFixed(2)}`}</p>
        </div>
        <div className={`${styles.cartList}`}>
          {cartStore.cart.map((cart) => (
            <div key={cart.product.id} className={`${styles.cartItem}`}>
              <img
                className={styles.cartItemImage}
                src={cart.product.image}
                alt={cart.product.title}
              />

              <div className={`${styles.cartItemInfo}`}>
                <p className={`${styles.cartItemTitle}`}>
                  {cart.product.title}
                </p>
                <p
                  className={`${styles.cartItemQuantity}`}
                >{`quantity: ${cart.quantity}`}</p>
                <div className={`${styles.buttonGroup}`}>
                  <button onClick={() => onAddQuantity(cart.product)}>
                    ➕
                  </button>
                  {cart.quantity > 1 && (
                    <button onClick={() => onDecrementQuantity(cart.product)}>
                      ➖
                    </button>
                  )}
                  <button
                    className={`${styles.removeButton}`}
                    onClick={() => onRemoveItemFromCart(cart.product)}
                  >
                    ❌
                  </button>
                </div>
              </div>
              <div className={`${styles.cartItemPriceContainer}`}>
                <p className={`${styles.cartItemPrice}`}>
                  {`$${(cart.product.price * cart.quantity).toFixed(2)}`}
                </p>
                <p className={`${styles.cartItemIndividualPrice}`}>{`${
                  cart.quantity
                } x $${cart.product.price.toFixed(2)}`}</p>
              </div>
            </div>
          ))}

          {cartStore.totalPrice === 0 && (
            <p>Your cart is empty. Please add item to cart.</p>
          )}
        </div>
      </div>
    </>
  );
}
