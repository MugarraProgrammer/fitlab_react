package cl.duoc.fitlab.repository;

import cl.duoc.fitlab.model.Usuario;
import java.util.Optional;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RepositorioUsuarios extends MongoRepository<Usuario, ObjectId> {
    // Spring Data crea la consulta a partir del nombre del método.
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
}