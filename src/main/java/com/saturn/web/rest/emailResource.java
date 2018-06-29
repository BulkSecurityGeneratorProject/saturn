package com.saturn.web.rest;

import com.saturn.config.Constants;
import com.codahale.metrics.annotation.Timed;
import com.saturn.domain.User;
import com.saturn.repository.UserRepository;
import com.saturn.service.UserService;
import com.saturn.service.MailService;
import com.saturn.service.dto.UserDTO;
import com.saturn.web.rest.util.HeaderUtil;
import com.saturn.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.security.access.prepost.PreAuthorize;

/**
 * REST controller for managing users.
 *
 */
@RestController
@RequestMapping("/api")
public class emailResource {

	private final Logger log = LoggerFactory.getLogger(emailResource.class);

	@Inject
	private UserRepository userRepository;

	@Inject
	private UserService userService;

	@Inject
	private MailService mailService;

	String welcomeMessage = "Welcome to Saturnvault, we look forward to keeping you updated";

	/**
	 * POST /email/welcome : Send an e-mail to reset the password of the user
	 *
	 * @param mail the mail of the user
	 * @return the ResponseEntity with status 200 (OK) if the e-mail was sent, or status 400 (Bad Request) if the e-mail
	 * address is not registered
	 */

	@PostMapping(path = "/email/welcome")
	@Timed
	public ResponseEntity<?> sendEmail(@RequestBody String mail) {
				mailService.sendEmail(mail, "Welcome", welcomeMessage, false, false);
				return new ResponseEntity<>("e-mail was sent", HttpStatus.OK);
	}


	@GetMapping(path = "/email/test")
	@Timed
		public ResponseEntity<?> TestEmail(){
			mailService.sendEmail("quinnpaterson_1996@yahoo.ca", "Welcome", welcomeMessage, false, false);
			return new ResponseEntity<>("e-mail was sent", HttpStatus.OK);
	}
}
