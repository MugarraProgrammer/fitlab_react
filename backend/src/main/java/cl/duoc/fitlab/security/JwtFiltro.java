package cl.duoc.fitlab.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// Se ejecuta en cada petición: si trae "Authorization: Bearer <token>" válido,
// le dice a Spring Security quién es el usuario y qué rol tiene.
@Component
public class JwtFiltro extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    public JwtFiltro(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                Claims datos = jwtUtil.validarToken(token);
                String email = datos.getSubject();
                String rol = datos.get("rol", String.class);
                // Spring Security usa el prefijo ROLE_ para hasRole("ADMIN").
                var autorizacion = new UsernamePasswordAuthenticationToken(
                        email, null, List.of(new SimpleGrantedAuthority("ROLE_" + rol)));
                SecurityContextHolder.getContext().setAuthentication(autorizacion);
            } catch (Exception e) {
                // Token inválido o vencido: se sigue sin usuario y Spring responde 401/403.
                SecurityContextHolder.clearContext();
            }
        }
        chain.doFilter(request, response);
    }
}