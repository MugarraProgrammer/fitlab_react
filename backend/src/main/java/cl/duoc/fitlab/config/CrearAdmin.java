package cl.duoc.fitlab.config;

import cl.duoc.fitlab.model.Usuario;
import cl.duoc.fitlab.repository.RepositorioUsuarios;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Al arrancar, si no existe, crea el usuario administrador de la tienda.
@Component
public class CrearAdmin implements CommandLineRunner {
    private final RepositorioUsuarios repositorio;
    private final PasswordEncoder passwordEncoder;

    public CrearAdmin(RepositorioUsuarios repositorio, PasswordEncoder passwordEncoder) {
        this.repositorio = repositorio;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (repositorio.existsByEmail("admin@fitlab.cl")) {
            return;
        }
        Usuario admin = new Usuario();
        admin.setNombre("Administrador");
        admin.setEmail("admin@fitlab.cl");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRol("ADMIN");
        repositorio.save(admin);
        System.out.println("Usuario admin@fitlab.cl creado (clave admin123)");
    }
}
