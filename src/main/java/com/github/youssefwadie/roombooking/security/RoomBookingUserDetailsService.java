package com.github.youssefwadie.roombooking.security;

import com.github.youssefwadie.roombooking.model.entities.User;
import com.github.youssefwadie.roombooking.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RoomBookingUserDetailsService  implements UserDetailsService {
    private final UserRepository userRepository;

    public RoomBookingUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByName(name);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException(String.format("No user with name: %s was found", name));
        }
        return new RoomBookingUserDetails(user.get());
    }
}
