package com.olympusgym.olympusgym.repository;

import com.olympusgym.olympusgym.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    List<Pago> findByUsuarioId(Long usuarioId);

    @Query("SELECT SUM(p.costo) FROM Pago p")
    Double sumTotalIngresos();
}