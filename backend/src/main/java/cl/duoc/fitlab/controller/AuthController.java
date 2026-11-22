package cl.duoc.fitlab.controller;

import cl.duoc.fitlab.dto.AuthResponse;
import cl.duoc.fitlab.dto.LoginRequest;
import cl.duoc.fitlab.dto.RegistroRequest;
import cl.duoc.fitlab.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.security.Principal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autenticación", description = "Registro, login y perfil con JWT")
public class AuthController {
    private final AuthService servicio;

    public AuthController(AuthService servicio) {
        this.servicio = servicio;
    }

    @Operation(summary = "Registrar un usuario (rol USER) y devolver su token")
    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registro(@RequestBody RegistroRequest datos) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicio.registrar(datos));
    }

    @Operation(summary = "Iniciar sesión y obtener el token JWT")
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest datos) {
        return servicio.login(datos);
    }

    @Operation(summary = "Ver los datos del usuario del token")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/perfil")
    public AuthResponse perfil(Principal principal) {
        // principal.getName() es el email que el filtro JWT sacó del token.
        return servicio.perfil(principal.getName());
    }
}