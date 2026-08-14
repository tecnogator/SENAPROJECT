package com.olympusgym.olympusgym.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PlanDTO {
    private Long usuarioId;
    private String titulo;
    private String objetivo;
    private String descripcion;
    private Integer calorias;
    private Integer proteinas;
    private Integer carbohidratos;
    private Integer grasas;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}