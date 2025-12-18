package org.vaadin.example;

import java.io.IOException;
import java.security.Principal;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.filter.OncePerRequestFilter;

public class FakeAuthenticator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if (request.getParameter("login") != null) {
            request.getSession(true).setAttribute("user", newPrincipal("TESTUSER"));
        } else if (request.getParameter("logout") != null && session != null) {
            session.removeAttribute("user");
        }

        if (session != null && session.getAttribute("user") instanceof Principal principal) {
            request = new HttpServletRequestWrapper(request) {
                @Override
                public Principal getUserPrincipal() {
                    return principal;
                }

                @Override
                public boolean isUserInRole(String role) {
                    return true;
                }
            };
        }
        filterChain.doFilter(request, response);
    }

    private Principal newPrincipal(String name) {
        return () -> name;
    }
}
