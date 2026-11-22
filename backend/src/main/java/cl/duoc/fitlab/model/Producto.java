package cl.duoc.fitlab.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

// Lombok genera los métodos de acceso durante la compilación.
// @Document indica que cada Producto se guarda en la colección "productos".
@Getter
@Setter
@NoArgsConstructor
@Document(collection = "productos")
public class Producto {
    // Identificador interno que genera MongoDB (igual que el ejemplo del profesor).
    // @JsonIgnore: no se envía al frontend, React usa el "id" numérico.
    @Id
    @JsonIgnore
    private ObjectId _id;

    @Schema(description = "Identificador del producto", example = "1")
    @Field("id")
    private int id;

    @Schema(description = "Nombre que se muestra en el catálogo", example = "Creatina 300g")
    private String nombre;

    @Schema(description = "Precio entero en pesos chilenos (CLP)", example = "24990")
    private int precio;

    @Schema(description = "Categoría del producto", example = "Suplementos")
    private String categoria;

    @Schema(description = "Descripción corta", example = "Creatina 100% pura")
    private String descripcion;

    @Schema(description = "Ruta o URL de la imagen", example = "/creatina.webp")
    private String imagen;

    @Schema(description = "Unidades disponibles", example = "10")
    private int stock;
}