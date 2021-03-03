package controllers;


import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import services.QuizService;
import services.UserService;

import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/api/register")
    public void registaUser(@Valid @RequestBody User user){

        if(!userService.registaUser(user)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "email already taken");
        }
    }


}
