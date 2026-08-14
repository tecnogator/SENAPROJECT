package com.olympusgym.olympusgym.dto;

import lombok.Data;

@Data
public class RutinaDTO {
    private Long id;
    private Long usuarioId;
    private String dia;
    private String ejercicio;
    private Integer series;
    private Integer repeticiones;
}