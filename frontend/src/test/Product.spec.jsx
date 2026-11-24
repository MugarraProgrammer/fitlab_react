import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Product from "../components/Product";

const productoPrueba = {
  id: 1,
  nombre: "Creatina Monohidratada",
  descripcion: "Suplemento para fuerza y rendimiento",
  precio: 19990,
  stock: 10,
};

describe("Componente Product", () => {
  afterEach(() => {
    cleanup();
  });

  it("muestra el nombre del producto", () => {
    render(
      <Product producto={productoPrueba} alAgregarAlCarrito={() => {}} />
    );

    const titulo = screen.getByRole("heading", {
      name: "Creatina Monohidratada",
    });

    expect(titulo.textContent).toBe("Creatina Monohidratada");
  });

  it("muestra el botón para agregar al carrito", () => {
    render(
      <Product producto={productoPrueba} alAgregarAlCarrito={() => {}} />
    );

    const boton = screen.getByRole("button", {
      name: "Agregar al Carrito",
    });

    expect(boton.textContent.trim()).toBe("Agregar al Carrito");
    expect(boton.disabled).toBeFalse();
  });

  it("llama a alAgregarAlCarrito al hacer clic en el botón", () => {
    const agregar = jasmine.createSpy("agregar");
    render(<Product producto={productoPrueba} alAgregarAlCarrito={agregar} />);

    fireEvent.click(screen.getByRole("button", { name: "Agregar al Carrito" }));

    expect(agregar).toHaveBeenCalledWith(productoPrueba);
  });

  it("muestra Agotado y deshabilita el botón cuando no hay stock", () => {
    render(
      <Product
        producto={{ ...productoPrueba, stock: 0 }}
        alAgregarAlCarrito={() => {}}
      />
    );

    const boton = screen.getByRole("button", { name: "Agotado" });

    expect(boton.disabled).toBeTrue();
  });
});