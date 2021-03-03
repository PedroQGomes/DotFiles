package services;

import config.MyUserDetails;
import models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    public boolean registaUser(User u){
        User user = userRepository.getUserByEmail(u.getEmail());

        if(user != null){
            return false;
        }

        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        User util = new User();
        util.setEmail(u.getEmail());
        util.setRole("ROLE_USER");
        util.setPassword(bcrypt.encode(u.getPassword()));
        userRepository.save(util);
        return true;
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(username);

        if(user == null){
            throw new UsernameNotFoundException("email invalido");
        }
        return new MyUserDetails(user);
    }
}
