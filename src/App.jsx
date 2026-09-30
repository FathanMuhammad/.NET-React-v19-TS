import { StrictMode, useState } from "react"; 
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Order from "./Order";
// import PizzaOfTheDay from "./PizzaOfTheDay";
// import Header from "./Header";
// import { CartContext } from "./contexts";


const router = createRouter({ routeTree });
const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
