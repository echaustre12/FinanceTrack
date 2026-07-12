package com.financetrack.service;

import com.financetrack.dto.CategoryRequest;
import com.financetrack.model.Category;
import com.financetrack.model.User;
import com.financetrack.repository.CategoryRepository;
import com.financetrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public List<Category> getCategories(User user) {
        return categoryRepository.findByUserAndActiveTrue(user);
    }

    public Category createCategory(User user, CategoryRequest request) {
        String name = request.getName();
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Ingresa un nombre para la categoría.");
        }
        var existing = categoryRepository.findByUserAndNameIgnoreCase(user, name.trim());
        //La categoria ya existe y esta activa
        if (existing.isPresent() && existing.get().isActive()) {
            throw new IllegalArgumentException("Ya existe una categoría con ese nombre.");
        }
        //Ya existe dentro de la base pero estaba eliminada
        if (existing.isPresent()) {
            Category category = existing.get();
            category.setActive(true);
            return categoryRepository.save(category);
        }
        //Nueva categoría
        Category category = new Category();

        category.setName(name.trim());
        category.setActive(true);
        category.setUser(user);

        return categoryRepository.save(category);
    }

    public void deleteCategory(User user, Integer id) {
        Category category =
                categoryRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Categoría no encontrada."
                                )
                        );

        if (!category.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("No tienes permisos sobre esta categoría.");
        }

        category.setActive(false);

        categoryRepository.save(category);
    }
}