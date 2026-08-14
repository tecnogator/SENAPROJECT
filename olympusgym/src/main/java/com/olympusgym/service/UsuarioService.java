package com.olympusgym.service;

import com.olympusgym.model.Usuario;
import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<Usuario> findAll();
    Optional<Usuario> findById(Long id);
    Usuario save(Usuario usuario);
    void deleteById(Long id);
    Optional<Usuario> login(String email, String password);
    List<Usuario> findClientes();
    Optional<Usuario> findByEmail(String email);
}