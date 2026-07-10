package com.financetrack.repository; 

import com.financetrack.model.User; 
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; 

/*
* Repositorio JPA para la entidad User
* Permite realizar operaciones CRUD sobre users
*/

public interface UserRepository extends JpaRepository<User, Integer> {
    /*
    * Encontrar un usuario dado su email
    */
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}