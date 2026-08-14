package com.olympusgym.dto;

public class DashboardStatsDTO {
    private long totalUsuarios;
    private long totalClientes;
    private long totalRutinas;
    private double totalIngresos;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalUsuarios, long totalClientes, long totalRutinas, double totalIngresos) {
        this.totalUsuarios = totalUsuarios;
        this.totalClientes = totalClientes;
        this.totalRutinas = totalRutinas;
        this.totalIngresos = totalIngresos;
    }

    public long getTotalUsuarios() { return totalUsuarios; }
    public void setTotalUsuarios(long totalUsuarios) { this.totalUsuarios = totalUsuarios; }
    public long getTotalClientes() { return totalClientes; }
    public void setTotalClientes(long totalClientes) { this.totalClientes = totalClientes; }
    public long getTotalRutinas() { return totalRutinas; }
    public void setTotalRutinas(long totalRutinas) { this.totalRutinas = totalRutinas; }
    public double getTotalIngresos() { return totalIngresos; }
    public void setTotalIngresos(double totalIngresos) { this.totalIngresos = totalIngresos; }
}