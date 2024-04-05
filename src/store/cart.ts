import { Cart } from "@/models/Cart";
import { Product } from "@/models/Product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface cartState {
  cart: Cart[]
  totalPrice: number
  updateTotalPrice: () => void
  getProductQuantity: (product: Product) => number
  isProductIncart: (product: Product) => boolean
  addProductTocart: (product: Product) => void
  removeProductFromcart: (product: Product) => void
  incrementProductIncart: (product: Product) => void
  decrementProductIncart: (product: Product) => void
  changeProductQuantity: (product: Product, quantity: number) => void
}

export const useCartStore = create<cartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      updateTotalPrice() {
        const cart = get().cart
        const totalPrice = cart.reduce((acc, cartItem) => {
          return acc + (cartItem.product.price * cartItem.quantity)
        }, 0)
        set({ totalPrice })
      },
      getProductQuantity(product) {
        const isProductIncart = get().isProductIncart(product)
        if (!isProductIncart) return 0
        return get().cart.find(cart => cart.product.id === product.id)?.quantity || 0
      },
      isProductIncart: (product) => {
        const cartSet = new Set(get().cart.map(cart => cart.product.id))
        return cartSet.has(product.id)
      },
      addProductTocart(product) {
        const isProductIncart = get().isProductIncart(product)
        if (isProductIncart) get().incrementProductIncart(product)
        else {
          set({ cart: [...get().cart, { product, quantity: 1 }] })
          get().updateTotalPrice()
        }
      },
      removeProductFromcart(product) {
        const isProductIncart = get().isProductIncart(product)
        if (!isProductIncart) return
        set({ cart: get().cart.filter(cart => cart.product.id !== product.id) })
        get().updateTotalPrice()

      },
      incrementProductIncart(product) {
        const isProductIncart = get().isProductIncart(product)
        if (!isProductIncart) return
        set({ cart: get().cart.map(cart => cart.product.id === product.id ? { ...cart, quantity: cart.quantity + 1 } : cart) })
        get().updateTotalPrice()

      },
      decrementProductIncart(product) {
        const isProductIncart = get().isProductIncart(product)
        if (!isProductIncart) return
        set({ cart: get().cart.map(cart => cart.product.id === product.id ? { ...cart, quantity: cart.quantity - 1 } : cart) })
        get().updateTotalPrice()

      },
      changeProductQuantity(product, quantity) {
        const isProductIncart = get().isProductIncart(product)
        if (!isProductIncart) return
        set({ cart: get().cart.map(cart => cart.product.id === product.id ? { ...cart, quantity } : cart) })
        get().updateTotalPrice()
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)