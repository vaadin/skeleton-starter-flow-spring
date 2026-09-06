package org.vaadin.example;

import com.vaadin.flow.spring.security.VaadinSecurityConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // WORKAROUND (see REPRODUCER.md): Vaadin renders the PWA offline page
        // inside a same-origin <iframe src="./offline-stub.html">, which Spring
        // Security's default X-Frame-Options: DENY blocks. Uncomment to make
        // the offline page appear again.
        //
        // http.headers(headers -> headers.frameOptions(fo -> fo.sameOrigin()));

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/public/**",
                        "/actuator/prometheus",
                        "/actuator/health",
                        "/playbook/**",
                        "/images/**"
                ).permitAll()
        );

        // Configure Vaadin's security using VaadinSecurityConfigurer
        http.with(VaadinSecurityConfigurer.vaadin(), configurer -> {
            // This is important to register your login view to the
            // navigation access control mechanism:
            //configurer.loginView(LoginView.class);

            // You can add any possible extra configurations of your own
            // here (the following is just an example):
            // configurer.enableCsrfConfiguration(false);
        });

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
                "/offline.html",
                "/manifest.webmanifest",
                "/sw.js",
                "/sw.js.map",
                "/robots.txt",
                "/sitemap.xml"
        );
    }
}
