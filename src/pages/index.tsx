import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { Products } from "@/models/Product";
import ProductGrid from "@/components/ProductGrid";
import { fetchProducts } from "@/api/Product";

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Brown Commerce App</title>
        <meta name="description" content="Brown Commerce App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductGrid products={products} />
    </>
  );
}

export const getServerSideProps = (async () => {
  const products: Products = await fetchProducts({ params: {} });
  return { props: { products } };
}) satisfies GetServerSideProps<{ products: Products }>;
