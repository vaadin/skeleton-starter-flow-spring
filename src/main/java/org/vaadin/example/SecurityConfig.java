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

        // WORKAROUND (see REPRODUCER.md): the offline path configured in
        // @PWA is not part of Vaadin's default permitted resources -- only the
        // hardcoded "/offline.html" is -- so the service worker gets a 403 when
        // it tries to precache it. Uncomment to make the offline page work.
        //
        // http.authorizeHttpRequests(auth -> auth
        //         .requestMatchers("/custom-offline.html").permitAll());

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
