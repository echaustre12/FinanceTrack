package com.financetrack.repository;

import com.financetrack.model.Category;
import com.financetrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByUserAndActiveTrue(User user);
    List<Category> findByUser(User user);
    Optional<Category> findByUserAndNameIgnoreCase(User user,String name);
}