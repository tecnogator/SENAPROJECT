package com.olympusgym.repository;

import com.olympusgym.model.PlanAlimentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlanAlimentacionRepository extends JpaRepository<PlanAlimentacion, Long> {
    List<PlanAlimentacion> findByUsuarioId(Long usuarioId);
}