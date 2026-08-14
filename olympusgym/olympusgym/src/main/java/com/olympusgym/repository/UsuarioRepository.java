package com.olympusgym.olympusgym.repository;

import com.olympusgym.olympusgym.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Query("SELECT COUNT(u) FROM Usuario u")
    long countTotalUsuarios();

    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.rol = 'CLIENTE'")
    long countClientes();

    boolean existsByEmail(String email);
}