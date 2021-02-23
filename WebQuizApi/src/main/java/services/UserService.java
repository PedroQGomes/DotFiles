package services;

import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;


    public void registaUser(User u){

    }

    public boolean validUser(User u){
        if(userRepository.findById(u.getEmail()).isPresent()){
            return true;
        }
        return false;
    }

}
