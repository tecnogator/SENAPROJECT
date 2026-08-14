package com.olympusgym.dto;

import com.olympusgym.model.*;

public class AsignacionRequest {
    private Long usuarioId;
    private PlanAlimentacion planAlimentacion;
    private Rutina rutina;
    private Suplemento suplemento;
    private Membresia membresia;

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public PlanAlimentacion getPlanAlimentacion() { return planAlimentacion; }
    public void setPlanAlimentacion(PlanAlimentacion planAlimentacion) { this.planAlimentacion = planAlimentacion; }
    public Rutina getRutina() { return rutina; }
    public void setRutina(Rutina rutina) { this.rutina = rutina; }
    public Suplemento getSuplemento() { return suplemento; }
    public void setSuplemento(Suplemento suplemento) { this.suplemento = suplemento; }
    public Membresia getMembresia() { return membresia; }
    public void setMembresia(Membresia membresia) { this.membresia = membresia; }
}