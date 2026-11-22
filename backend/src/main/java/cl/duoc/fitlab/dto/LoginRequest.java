package cl.duoc.fitlab.dto;

// Datos que envía el frontend para iniciar sesión.
public record LoginRequest(String email, String password) {}