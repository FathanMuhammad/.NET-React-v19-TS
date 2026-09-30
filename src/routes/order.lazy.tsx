import { useEffect, useState, useContext } from 'react';
import Cart from '../Cart';
import Pizza from "../Pizza";
import { CartContext } from '../contexts';
import { createLazyFileRoute } from '@tanstack/react-router';
import type { Pizza as PizzaType, PizzaSize } from "../APIResponsesTypes";


const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const Route = createLazyFileRoute('/order')({
  component: Order,
})

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState<PizzaType[]>([]);
  const [pizzaType, setPizzaType] = useState('pepperoni')
  const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");
  const [cart, setCart] = useContext(CartContext)
  const [loading, setLoading] = useState(true)

let price: string | undefined;
let selectedPizza: PizzaType | undefined;
if (!loading) {
  selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
  price = selectedPizza
    ? intl.format(selectedPizza.sizes[pizzaSize])
    : undefined;
}

  useEffect(() => {
    void fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
  const pizzasRes = await fetch("/api/pizzas");
  const pizzasJson = (await pizzasRes.json()) as PizzaType[];
  setPizzaTypes(pizzasJson);
  setLoading(false);
  }

  async function checkout() {
    setLoading(true)

    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart,
      }),
    })

    setCart([])
    setLoading(false)
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedPizza || !price) {
            return;
          }
          setCart([
            ...cart,
            { pizza: selectedPizza, size: pizzaSize, price },
          ]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              onChange={(e) => setPizzaType(e.target.value)}
              name="pizza-type"
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
              <span>
                <input
                  onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                  checked={pizzaSize === "S"}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === 'M'}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === 'L'}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading || !selectedPizza ? (
          <h3>LOADING …</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>

      {loading ? <h2>LOADING …</h2> : <Cart checkout={() => void checkout()} cart={cart} />}
    </div>
  )
}
