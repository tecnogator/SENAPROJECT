package com.olympusgym.controller;

import com.olympusgym.model.PlanAlimentacion;
import com.olympusgym.model.Usuario;
import com.olympusgym.repository.PlanAlimentacionRepository;
import com.olympusgym.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/planes")
@CrossOrigin(origins = "*")
public class PlanAlimentacionController {

    @Autowired
    private PlanAlimentacionRepository planRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/asignar")
    public ResponseEntity<?> asignarPlan(@RequestBody PlanAlimentacion plan) {
        if (plan.getUsuario() == null || plan.getUsuario().getId() == null) {
            return ResponseEntity.badRequest().body("Usuario no especificado");
        }

        Usuario usuario = usuarioRepository.findById(plan.getUsuario().getId())
                .orElse(null);

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }

        plan.setUsuario(usuario);
        return ResponseEntity.ok(planRepository.save(plan));
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<PlanAlimentacion> getPlanesByUsuario(@PathVariable Long usuarioId) {
        return planRepository.findByUsuarioId(usuarioId);
    }

    @GetMapping
    public List<PlanAlimentacion> getAllPlanes() {
        return planRepository.findAll();
    }
}