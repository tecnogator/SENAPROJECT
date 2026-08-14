package com.olympusgym.olympusgym.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UsuarioDTO {
    private Long id;
    private String nombreCompleto;
    private String email;
    private String password;
    private String rol;
    private LocalDateTime fechaRegistro;
}