package cl.duoc.fitlab.service;

import cl.duoc.fitlab.model.Producto;
import cl.duoc.fitlab.repository.RepositorioProductos;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductosService {
    private final RepositorioProductos repositorio;

    public ProductosService(RepositorioProductos repositorio) {
        this.repositorio = repositorio;
    }

    public List<Producto> listar() {
        // Igual que el profesor: catálogo ordenado por id ascendente.
        return repositorio.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Optional<Producto> buscarPorId(int id) {
        return repositorio.buscarPorId(id);
    }

    public Producto crear(Producto producto) {
        // El nuevo id es el mayor existente + 1. MongoDB genera el _id.
        int siguienteId = repositorio.findAll(Sort.by(Sort.Direction.DESC, "id")).stream()
                .findFirst()
                .map(p -> p.getId() + 1)
                .orElse(1);
        producto.set_id(null);
        producto.setId(siguienteId);
        return repositorio.save(producto);
    }

    public Optional<Producto> actualizar(int id, Producto datos) {
        return repositorio.buscarPorId(id).map(existente -> {
            existente.setNombre(datos.getNombre());
            existente.setPrecio(datos.getPrecio());
            existente.setCategoria(datos.getCategoria());
            existente.setDescripcion(datos.getDescripcion());
            existente.setImagen(datos.getImagen());
            existente.setStock(datos.getStock());
            // Conserva el _id, así save() actualiza en vez de crear otro documento.
            return repositorio.save(existente);
        });
    }

    public boolean eliminar(int id) {
        if (!repositorio.existePorId(id)) {
            return false;
        }
        repositorio.eliminarPorId(id);
        return true;
    }
}