package com.github.youssefwadie.roombooking.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.util.Base64;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JWTService {
	private RSAPrivateKey privateKey;
	private RSAPublicKey publicKey;
	private long expirationTime = 1800000;

	@PostConstruct
	private void init() throws NoSuchAlgorithmException {
		KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
		generator.initialize(2048);
		KeyPair keyPair = generator.generateKeyPair();

		privateKey = (RSAPrivateKey) keyPair.getPrivate();
		publicKey = (RSAPublicKey) keyPair.getPublic();
	}

	public String generateToken(String name, String role) {
		return JWT.create().withClaim("user", name).withClaim("role", role)
				.withExpiresAt(Instant.now().plusMillis(expirationTime)).sign(Algorithm.RSA256(publicKey, privateKey));
	}

	public String validateToken(String token) throws JWTVerificationException {
		String encodedPayload = JWT
				.require(Algorithm.RSA256(publicKey, privateKey))
				.build()
				.verify(token)
				.getPayload();

		return new String(Base64.getDecoder().decode(encodedPayload));
	}
	public long getExpirationTime() {
		return expirationTime;
	}
}
