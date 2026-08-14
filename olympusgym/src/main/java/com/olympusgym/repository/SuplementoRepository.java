package com.olympusgym.repository;

import com.olympusgym.model.Suplemento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SuplementoRepository extends JpaRepository<Suplemento, Long> {
    List<Suplemento> findByUsuarioId(Long usuarioId);
}