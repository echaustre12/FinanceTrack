package com.financetrack.controller;

import com.financetrack.dto.CategoryRequest;
import com.financetrack.model.Category;
import com.financetrack.model.User;
import com.financetrack.repository.UserRepository;
import com.financetrack.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final UserRepository userRepository;

    private User getUser(Authentication authentication) {
        return userRepository
                .findByEmail(
                        authentication.getName()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Usuario no encontrado."
                        )
                );
    }
    @GetMapping
    public List<Category> getCategories(Authentication authentication) {
        return categoryService.getCategories(getUser(authentication));
    }
    @PostMapping
    public Category create(@RequestBody CategoryRequest request, Authentication authentication) {
        return categoryService.createCategory(getUser(authentication), request);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id, Authentication authentication) {
        categoryService.deleteCategory(getUser(authentication), id);
    }
}