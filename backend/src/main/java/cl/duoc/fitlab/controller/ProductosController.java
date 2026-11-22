
package cl.duoc.fitlab.controller;

import cl.duoc.fitlab.model.Producto;
import cl.duoc.fitlab.service.ProductosService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productos")
@Tag(name = "Productos", description = "CRUD del catalogo FitLab")
public class ProductosController {
    private final ProductosService servicio;

    public ProductosController(ProductosService servicio) {
        this.servicio = servicio;
    }

    @Operation(summary = "Listar los productos")
    @GetMapping
    public List<Producto> listar() {
        return servicio.listar();
    }

    @Operation(summary = "Obtener un producto por id")
    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscar(@PathVariable int id) {
        return servicio.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear un producto (solo ADMIN)")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crear(producto));
    }

    @Operation(summary = "Actualizar un producto (solo ADMIN)")
    @SecurityRequirement(name = "bearerAuth")
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable int id, @RequestBody Producto producto) {
        return servicio.actualizar(id, producto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar un producto (solo ADMIN)")
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        return servicio.eliminar(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}