package com.github.youssefwadie.roombooking.config;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.github.youssefwadie.roombooking.services.JWTService;

public class JWTAutorizationFilter extends OncePerRequestFilter {
	private JWTService jwtService;

	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		if (jwtService == null) {
			ServletContext servletContext = request.getServletContext();
			WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			jwtService = wac.getBean(JWTService.class);
		}
		Cookie tokenCookie = getTokenCookie(request);
		UsernamePasswordAuthenticationToken authentication = getAuthentication(tokenCookie.getValue());

		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		securityContext.setAuthentication(authentication);
		SecurityContextHolder.setContext(securityContext);

		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
		try {
			String payload = jwtService.validateToken(jwtToken);
			JsonParser parser = JsonParserFactory.getJsonParser();
			Map<String, Object> payloadMap = parser.parseMap(payload);
			String user = payloadMap.get("user").toString();
			String role = payloadMap.get("role").toString();
			List<GrantedAuthority> roles = List.of(new SimpleGrantedAuthority(String.format("ROLE_%s", role)));
			return new UsernamePasswordAuthenticationToken(user, null, roles);
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public boolean shouldNotFilter(HttpServletRequest request) {
		return this.getTokenCookie(request) == null;
	}
	
	
	private Cookie getTokenCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies == null) {
			return null;
		}
		for(Cookie cookie : cookies) {
			if(cookie.getName() == "token") {
				return cookie;
			}
		}
		return null;
	}
}
