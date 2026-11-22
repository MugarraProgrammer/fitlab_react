package cl.duoc.fitlab.service;

import cl.duoc.fitlab.dto.AuthResponse;
import cl.duoc.fitlab.dto.LoginRequest;
import cl.duoc.fitlab.dto.RegistroRequest;
import cl.duoc.fitlab.model.Usuario;
import cl.duoc.fitlab.repository.RepositorioUsuarios;
import cl.duoc.fitlab.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final RepositorioUsuarios repositorio;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(RepositorioUsuarios repositorio, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repositorio = repositorio;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse registrar(RegistroRequest datos) {
        if (datos.nombre() == null || datos.email() == null || datos.password() == null
                || datos.password().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos incompletos o contraseña muy corta");
        }
        if (repositorio.existsByEmail(datos.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El correo ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(datos.nombre());
        usuario.setEmail(datos.email());
        usuario.setPassword(passwordEncoder.encode(datos.password()));
        usuario.setRol("USER"); // Todo el que se registra es cliente
        repositorio.save(usuario);
        return crearRespuesta(usuario);
    }

    public AuthResponse login(LoginRequest datos) {
        Usuario usuario = repositorio.findByEmail(datos.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));
        // matches compara la contraseña escrita con la encriptada en la base.
        if (!passwordEncoder.matches(datos.password(), usuario.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        }
        return crearRespuesta(usuario);
    }

    public AuthResponse perfil(String email) {
        Usuario usuario = repositorio.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        return new AuthResponse(null, usuario.getNombre(), usuario.getEmail(), usuario.getRol());
    }

    private AuthResponse crearRespuesta(Usuario usuario) {
        String token = jwtUtil.generarToken(usuario);
        return new AuthResponse(token, usuario.getNombre(), usuario.getEmail(), usuario.getRol());
    }
}