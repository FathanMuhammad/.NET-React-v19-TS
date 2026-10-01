import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto my-30 grid max-w-175 grid-cols-1 gap-7.5 sm:grid-cols-2">
      <div className="flex flex-col">
        <h1 className="font-pacifico text-[40px] font-normal text-primary">
          Padre Gino's
        </h1>
        <p className="max-w-[315px] font-bold text-[40px] uppercase text-secondary">
          Pizza & Art at a location near you
        </p>
      </div>
      <ul className="flex flex-col items-center justify-center">
        <li className="w-full max-w-62.5 text-center">
          <Link className="btn mb-2.5 w-full" to="/order">
            Order
          </Link>
        </li>
        <li className="w-full max-w-62.5 text-center">
          <Link className="btn mb-2.5 w-full" to="/past">
            Past Orders
          </Link>
        </li>
        <li className="w-full max-w-62.5 text-center">
          <Link className="btn mb-2.5 w-full" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}