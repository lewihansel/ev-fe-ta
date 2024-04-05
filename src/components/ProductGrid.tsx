import { useCallback } from "react";
import { useRouter } from "next/router";
import { Products } from "@/models/Product";
import styles from "@/styles/ProductGrid.module.scss";

export default function ProductGrid({ products }: { products: Products }) {
  const router = useRouter();
  const onClickProduct = useCallback(
    (productId: number) => {
      router.push(`/detail/${productId}`);
    },
    [router]
  );

  return (
    <div className={`${styles.productsGrid}`}>
      {products.map((product, i) => (
        <div
          key={i}
          id={`product-${i}`}
          className={`${styles.productItem}`}
          onClick={() => onClickProduct(product.id)}
        >
          <img
            src={product.image}
            alt={product.title}
            className={`${styles.productImage}`}
          />

          <div className={`${styles.productInfo}`}>
            <div className={`${styles.productTitle}`}>{product.title}</div>
            <div className={`${styles.productPrice}`}>{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
