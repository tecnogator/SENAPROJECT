package com.olympusgym.olympusgym.repository;

import com.olympusgym.olympusgym.model.Rutina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RutinaRepository extends JpaRepository<Rutina, Long> {

    List<Rutina> findByUsuarioId(Long usuarioId);

    @Query("SELECT COUNT(r) FROM Rutina r")
    long countTotalRutinas();
}