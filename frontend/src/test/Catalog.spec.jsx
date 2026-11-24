import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Catalog from "../components/Catalog";
import productosData from "../data/productos.json";

describe("Componente Catalog", () => {
  afterEach(() => {
    cleanup();
  });

  it("muestra el título del catálogo", () => {
    render(<Catalog addToCart={() => {}} productos={productosData} />);
    const titulo = screen.getByRole("heading", {
      name: "Nuestros Productos",
    });
    expect(titulo.textContent).toBe("Nuestros Productos");
  });

  it("muestra la paginación en la página 1", () => {
    render(<Catalog addToCart={() => {}} productos={productosData} />);
    const pagina = screen.getByText(/Página 1 de/);
    expect(pagina).toBeTruthy();
  });

  it("muestra la ayuda de uso al presionar el botón Ayuda", () => {
    render(<Catalog addToCart={() => {}} productos={productosData} />);
    const botonesAyuda = screen.getAllByRole("button", { name: "Ayuda" });
    fireEvent.click(botonesAyuda[0]);
    expect(screen.getByText(/Ayuda de Uso:/)).toBeTruthy();
  });

  it("cambia a la página 2 al presionar el botón siguiente", () => {
    render(<Catalog addToCart={() => {}} productos={productosData} />);
    fireEvent.click(screen.getByRole("button", { name: ">" }));
    expect(screen.getByText(/Página 2 de/)).toBeTruthy();
  });
});