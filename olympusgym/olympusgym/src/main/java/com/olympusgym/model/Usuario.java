package com.olympusgym.olympusgym.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    // Relaciones
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Rutina> rutinas;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<PlanAlimentacion> planesAlimentacion;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Suplemento> suplementos;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private Membresia membresia;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Pago> pagos;
}

enum Rol {
    ADMIN,
    CLIENTE
}