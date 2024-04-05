import styles from "@/styles/Navbar.module.scss";
import Link from "next/link";
import { useMemo } from "react";

export default function Navbar() {
  const navMenus = useMemo(
    () => [
      // { name: "Wishlist", path: "/wishlist" },
      { name: "Cart", path: "/cart" },
    ],
    []
  );
  return (
    <nav className={`${styles.navbar}`}>
      <Link href="/" className={`${styles.logo}`}>
        🛒 Brown Commerce
      </Link>
      <div className={`${styles.menus}`}>
        {navMenus.map(({ name, path }) => (
          <Link key={name} href={path} className={`${styles.menu}`}>
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
