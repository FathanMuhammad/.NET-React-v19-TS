import { useEffect, useState, useContext } from 'react'
import Pizza from '../Pizza'
import Cart from '../Cart'
import { CartContext } from '../contexts'
import { createLazyFileRoute } from '@tanstack/react-router'

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const Route = createLazyFileRoute('/order')({
  component: Order,
})

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState('pepperoni')
  const [pizzaSize, setPizzaSize] = useState('M')
  const [cart, setCart] = useContext(CartContext)
  const [loading, setLoading] = useState(true)

  let price, selectedPizza
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(
      selectedPizza?.sizes ? selectedPizza.sizes[pizzaSize] : '',
    )
  }

  useEffect(() => {
    fetchPizzaTypes()
  }, [])

  async function fetchPizzaTypes() {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const pizzasRes = await fetch('/api/pizzas')
    const pizzasJson = await pizzasRes.json()
    setPizzaTypes(pizzasJson)
    setLoading(false)
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
          e.preventDefault()
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
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
                  checked={pizzaSize === 'S'}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
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
                  onChange={(e) => setPizzaSize(e.target.value)}
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
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading ? (
          <h3>Loading...</h3>
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

      {loading ? <h2>LOADING …</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  )
}
