import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach } from "vitest";
import Pizza from "../Pizza";
import Modal from "../Modal";

afterEach(cleanup);

// Basic Test 1: Menguji render komponen Pizza
test("renders pizza name and description", () => {
  const screen = render(
    <Pizza name="Margherita" description="Fresh basil and mozzarella" />
  );

  const heading = screen.getByRole("heading");
  expect(heading.innerText).toBe("Margherita");

  const description = screen.getByText("Fresh basil and mozzarella");
  expect(description).toBeDefined();
});

// Basic Test 2: Menguji render children di dalam Modal
test("renders modal children content", () => {
  // Buat modal root element di DOM seperti pada index.html
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  const screen = render(
    <Modal>
      <h1>Order Details</h1>
      <p>Your order is being processed</p>
    </Modal>
  );

  expect(screen.getByText("Order Details")).toBeDefined();
  expect(screen.getByText("Your order is being processed")).toBeDefined();

  // Cleanup modal root
  document.body.removeChild(modalRoot);
});
