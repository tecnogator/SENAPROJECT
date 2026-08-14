package com.olympusgym.controller;

import com.olympusgym.model.Rutina;
import com.olympusgym.model.Usuario;
import com.olympusgym.repository.RutinaRepository;
import com.olympusgym.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
@CrossOrigin(origins = "*")
public class RutinaController {

    @Autowired
    private RutinaRepository rutinaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/asignar")
    public ResponseEntity<?> asignarRutina(@RequestBody Rutina rutina) {
        if (rutina.getUsuario() == null || rutina.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("Usuario no especificado");
        }

        Usuario usuario = usuarioRepository.findById(rutina.getUsuario().getId())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        rutina.setUsuario(usuario);
        return ResponseEntity.ok(rutinaRepository.save(rutina));
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Rutina> getRutinasByUsuario(@PathVariable Long usuarioId) {
        return rutinaRepository.findByUsuarioId(usuarioId);
    }

    @GetMapping
    public List<Rutina> getAllRutinas() {
        return rutinaRepository.findAll();
    }
}