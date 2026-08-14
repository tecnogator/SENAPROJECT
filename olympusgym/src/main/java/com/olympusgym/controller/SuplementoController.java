package com.olympusgym.controller;

import com.olympusgym.model.Suplemento;
import com.olympusgym.model.Usuario;
import com.olympusgym.repository.SuplementoRepository;
import com.olympusgym.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/suplementos")
@CrossOrigin(origins = "*")
public class SuplementoController {

    @Autowired
    private SuplementoRepository suplementoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/asignar")
    public ResponseEntity<?> asignarSuplemento(@RequestBody Suplemento suplemento) {
        if (suplemento.getUsuario() == null || suplemento.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("Usuario no especificado");
        }

        Usuario usuario = usuarioRepository.findById(suplemento.getUsuario().getId())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        suplemento.setUsuario(usuario);
        return ResponseEntity.ok(suplementoRepository.save(suplemento));
    }
}