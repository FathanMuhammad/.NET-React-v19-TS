import React from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./Order";

// const Pizza = (props) => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("p", {}, props.description),
//   ]);
// };

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Pixel Perfect Pizzas"),
//     React.createElement(Pizza, {
//       name: "The Pepperoni Pizza",
//       description: "Mozzarella Cheese, Pepperoni",
//     }),
//     React.createElement(Pizza, {
//       name: "The Hawaiian Pizza",
//       description: "Sliced Ham, Pineapple, Mozzarella Cheese",
//     }),
//     React.createElement(Pizza, {
//       name: "The Big Meat Pizza",
//       description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
//     }),
//   ]);
// };

const App = () => {
  return (
    <div>
      {/* <h1>Padre Gino's Pizza - Order Now</h1>
      <Pizza name="Pepperoni" description="Mozzarella Cheese, Pepperoni" />
      <Pizza
        name="The Hawaiian Pizza"
        description="Sliced Ham, Pineapple, Mozzarella Cheese"
        image={"/public/pizzas/pepperoni.webp"}
      />
      <Pizza
        name="The Big Meat Pizza"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
        image={"/public/pizzas/hawaiian.webp"}
      /> */}
      <Order />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
// root.render(React.createElement(App));
root.render(<App />);
