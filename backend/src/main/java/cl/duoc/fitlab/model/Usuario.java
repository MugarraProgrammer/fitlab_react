package cl.duoc.fitlab.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Cada usuario se guarda en la colección "usuarios" de MongoDB.
@Getter
@Setter
@NoArgsConstructor
@Document(collection = "usuarios")
public class Usuario {
    @Id
    private ObjectId _id;
    private String nombre;
    private String email;
    // La contraseña se guarda encriptada con BCrypt, nunca en texto plano.
    private String password;
    // "ADMIN" o "USER"
    private String rol;
}