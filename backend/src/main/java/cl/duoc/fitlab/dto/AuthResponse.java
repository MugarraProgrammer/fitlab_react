package cl.duoc.fitlab.dto;

// Respuesta del login y del registro: el token JWT y los datos básicos del usuario.
public record AuthResponse(String token, String nombre, String email, String rol) {}