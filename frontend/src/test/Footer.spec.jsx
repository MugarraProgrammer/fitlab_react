import { render, screen, cleanup } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Componente Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("muestra el nombre de la marca", () => {
    render(<Footer />);

    const marca = screen.getByRole("heading", { name: "FITLAB" });

    expect(marca.textContent).toBe("FITLAB");
  });

  it("muestra la dirección de la tienda", () => {
    render(<Footer />);

    const direccion = screen.getByText("Av. Concha y Toro #1145, Puente Alto");

    expect(direccion).toBeTruthy();
  });
});