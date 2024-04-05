import { Product } from "@/models/Product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  wishlist: Product["id"][]
  isProductInWishlist: (productId: Product["id"]) => boolean
  addProductToWishlist: (productId: Product["id"]) => void
  toggleProductInWishlist: (productId: Product["id"]) => void
  removeProductFromWishlist: (productId: Product["id"]) => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      isProductInWishlist: (productId) => {
        const wishlistSet = new Set(get().wishlist)
        return wishlistSet.has(productId)
      },
      addProductToWishlist: (productId) => {
        const isProductInWishlist = get().isProductInWishlist(productId)
        if (isProductInWishlist) return
        set({ wishlist: [...get().wishlist, productId] })
      },
      toggleProductInWishlist: (productId) => {
        const isProductInWishlist = get().isProductInWishlist(productId)
        if (isProductInWishlist) get().removeProductFromWishlist(productId)
        else get().addProductToWishlist(productId)
      },
      removeProductFromWishlist: (productId) => {
        const isProductInWishlist = get().isProductInWishlist(productId)
        if (!isProductInWishlist) return
        set({ wishlist: get().wishlist.filter(id => id !== productId) })
      }
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)