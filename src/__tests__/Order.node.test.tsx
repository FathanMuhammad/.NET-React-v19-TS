import { render, cleanup } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { CartContext } from "../contexts";
import { Route } from "../routes/order.lazy";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

afterEach(() => {
  cleanup();
  fetchMocker.resetMocks();
});

test("renders pizza options and adds a pizza to cart", async () => {
  // 1. Mock response API untuk endpoint /api/pizzas
  fetchMocker.mockResponse(
    JSON.stringify([
      {
        id: "pepperoni",
        name: "The Pepperoni Pizza",
        category: "Classic",
        description: "Mozzarella Cheese, Pepperoni",
        image: "/public/pizzas/pepperoni.webp",
        sizes: { S: 9.75, M: 12.5, L: 15.25 },
      },
      {
        id: "hawaiian",
        name: "The Hawaiian Pizza",
        category: "Classic",
        description: "Sliced Ham, Pineapple, Mozzarella Cheese",
        image: "/public/pizzas/hawaiian.webp",
        sizes: { S: 10.5, M: 13.25, L: 16.5 },
      },
    ])
  );

  const cartState = [];
  const setCartMock = vi.fn();

  // 2. Render Order component yang dibungkus dengan CartContext
  const screen = render(
    <CartContext.Provider value={[cartState, setCartMock]}>
      <Route.options.component />
    </CartContext.Provider>
  );

  // 3. Tunggu hingga data selesai di-fetch dan harga pizza Pepperoni tampil
  const price = await screen.findByText("$12.50");
  expect(price).toBeDefined();

  // 4. Submit form untuk menambahkan pizza ke dalam cart
  const submitBtn = screen.getByRole("button", { name: /add to cart/i });
  submitBtn.click();

  // 5. Pastikan setCart dipanggil dengan data pizza yang dipilih
  expect(setCartMock).toHaveBeenCalledTimes(1);
  expect(setCartMock).toHaveBeenCalledWith([
    {
      pizza: expect.objectContaining({
        id: "pepperoni",
        name: "The Pepperoni Pizza",
      }),
      size: "M",
      price: "$12.50",
    },
  ]);
});
