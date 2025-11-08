package br.com.maisunifacisa.api.controller;

import br.com.maisunifacisa.api.controller.response.UserResponse;
import br.com.maisunifacisa.api.service.user.SearchUserService;
import br.com.maisunifacisa.api.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final SearchUserService searchUserService;

    @GetMapping("/me")
    public UserResponse getAuthenticatedCustomer() { return searchUserService.searchAuthenticatedUser(); }

    @GetMapping("/{id}")
    public UserResponse getCustomerById( @PathVariable final Long id) {
        return searchUserService.searchById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final Long id) {
        userService.deleteById(id);
    }

}
