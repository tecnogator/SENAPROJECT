package com.olympusgym.controller;

import com.olympusgym.model.Membresia;
import com.olympusgym.model.Usuario;
import com.olympusgym.repository.MembresiaRepository;
import com.olympusgym.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/membresias")
@CrossOrigin(origins = "*")
public class MembresiaController {

    @Autowired
    private MembresiaRepository membresiaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/asignar")
    public ResponseEntity<?> asignarMembresia(@RequestBody Membresia membresia) {
        if (membresia.getUsuario() == null || membresia.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("Usuario no especificado");
        }

        Usuario usuario = usuarioRepository.findById(membresia.getUsuario().getId())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        LocalDate fechaInicio = membresia.getFechaInicio() != null ?
                membresia.getFechaInicio() : LocalDate.now();
        LocalDate fechaFin = fechaInicio;

        switch (membresia.getTipo()) {
            case "Mensual":
                fechaFin = fechaInicio.plusMonths(1);
                break;
            case "Trimestral":
                fechaFin = fechaInicio.plusMonths(3);
                break;
            case "Anual":
                fechaFin = fechaInicio.plusYears(1);
                break;
        }

        membresia.setUsuario(usuario);
        membresia.setFechaInicio(fechaInicio);
        membresia.setFechaFin(fechaFin);

        return ResponseEntity.ok(membresiaRepository.save(membresia));
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Membresia> getMembresiasByUsuario(@PathVariable Long usuarioId) {
        return membresiaRepository.findByUsuarioId(usuarioId);
    }
}