package cl.duoc.fitlab.repository;

import cl.duoc.fitlab.model.Producto;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

// Igual que el profesor: la clave de MongoDB es ObjectId (_id).
// Se agregan consultas por el campo "id" numérico para el CRUD.
public interface RepositorioProductos extends MongoRepository<Producto, ObjectId> {
    @Query("{ 'id': ?0 }")
    Optional<Producto> buscarPorId(int id);

    @Query(value = "{ 'id': ?0 }", exists = true)
    boolean existePorId(int id);

    @Query(value = "{ 'id': ?0 }", delete = true)
    long eliminarPorId(int id);
}