package com.github.youssefwadie.roombooking.config;

import com.github.youssefwadie.roombooking.security.JWTAuthorizationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//	@Bean
//	InMemoryUserDetailsManager userDetailsManager() {
//		UserDetails youssef = User.withDefaultPasswordEncoder().username("youssef").password("secret")
//				.authorities("ROLE_ADMIN").build();
//		UserDetails john = User.withDefaultPasswordEncoder().username("john").password("secret")
//				.authorities("ROLE_USER").build();
//
//		// TODO: this password should be encoded
//		return new InMemoryUserDetailsManager(youssef, john);
//	}

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/api/basicAuth/**").permitAll()
                .antMatchers("/api/basicAuth/**").hasAnyRole("ADMIN", "USER");

        http.csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/bookings/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER")
                .antMatchers("/api/**").hasRole("ADMIN").and()
                .addFilterBefore(new JWTAuthorizationFilter(), BasicAuthenticationFilter.class);

//		http.userDetailsService(roomBookingUserDetailsService);
        http.httpBasic();

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedOrigins("http://localhost:4200").allowedHeaders("*")
                        .allowCredentials(true);

                // TODO: change the URL to the production URL
            }
        };
    }
}
