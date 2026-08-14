package com.olympusgym.controller;

import com.olympusgym.dto.DashboardStatsDTO;
import com.olympusgym.model.Rutina;
import com.olympusgym.repository.RutinaRepository;
import com.olympusgym.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RutinaRepository rutinaRepository;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        long totalUsuarios = usuarioRepository.count();
        long totalClientes = usuarioRepository.countByRol("cliente");
        long totalRutinas = rutinaRepository.count();
        double totalIngresos = 0.0;

        return new DashboardStatsDTO(totalUsuarios, totalClientes, totalRutinas, totalIngresos);
    }

    @GetMapping("/calendar")
    public List<Rutina> getCalendarEvents() {
        return rutinaRepository.findAll();
    }
}