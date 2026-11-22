package cl.duoc.fitlab.config;

import cl.duoc.fitlab.model.Producto;
import cl.duoc.fitlab.repository.RepositorioProductos;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.json.JsonMapper;

// Al arrancar, si la coleccion "productos" esta vacia, la llena con
// data/productos.json. Asi la primera vez ya tienes el catalogo en MongoDB.
@Component
public class CargaInicial implements CommandLineRunner {
    private final RepositorioProductos repositorio;
    private final JsonMapper jsonMapper;

    public CargaInicial(RepositorioProductos repositorio, JsonMapper jsonMapper) {
        this.repositorio = repositorio;
        this.jsonMapper = jsonMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repositorio.count() > 0) {
            return;
        }
        var recurso = new ClassPathResource("data/productos.json");
        try (var entrada = recurso.getInputStream()) {
            List<Producto> productos = jsonMapper.readValue(entrada, new TypeReference<List<Producto>>() {});
            repositorio.saveAll(productos);
            System.out.println("Carga inicial: " + productos.size() + " productos guardados en MongoDB");
        }
    }
}