import { Product, Products } from "@/models/Product";
import { BASE_URL } from "./Constants";

/**
 * Fetches a list of products from the API.
 *
 * @param params - An object containing an optional 'limit' and 'sort' parameters.
 * @param params.limit - The maximum number of products to fetch. If not provided, all products will be fetched.
 * @param params.sort - The sort order of the fetched products. Default is 'asc'.
 * @returns {Products} The Product List.
 */
export async function fetchProducts({
  params: { limit, sort }
}: { params: { limit?: number, sort?: "asc" | "desc" } }): Promise<Products> {
  const urlSearchParams = new URLSearchParams();
  if (limit) urlSearchParams.append("limit", limit.toString());
  if (sort) urlSearchParams.append("sort", sort);

  const url = `${BASE_URL}/products?${urlSearchParams.toString()}`;
  const res = await fetch(url);
  const products: Products = await res.json();

  return products;
}

/**
 * Fetches a product by its ID.
 *
 * @param {number} productId - The ID of the product to fetch.
 * @return {Product} The product fetched.
 */
export async function fetchProductById({
  productId
}: { productId?: string }) {
  const url = `${BASE_URL}/products/${productId}`
  const res = await fetch(url)
  const product: Product = await res.json()

  return product
}