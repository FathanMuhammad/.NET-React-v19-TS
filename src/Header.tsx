import { useAppSelector } from "./hooks";
import { selectCartCount } from "./cartSlice";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const cartCount = useAppSelector(selectCartCount);

  return (
    <nav className="grid w-full grid-cols-[repeat(5,auto)] border-b border-border">
      <Link
        to={"/"}
        className="col-span-3 col-start-2 flex items-center justify-center"
      >
        <h1 className="h-27.5 py-5 content-[url(/public/padre_gino.svg)]">
          Padre Gino's Pizza
        </h1>
      </Link>
      <div className="col-start-5 flex items-center justify-center text-[40px]">
        🛒
        <span
          className="relative -top-4.25 -left-4.25 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[18px] text-white"
          data-testid="cart-number"
        >
          {cartCount}
        </span>
      </div>
    </nav>
  );
}
