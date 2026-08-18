package project.HackHustle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.entity.Student;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.repository.StudentRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private StudentRepository studentRepository;

    // In-memory OTP storage (email → otp)
    private Map<String, String> otpStorage = new HashMap<>();

    // In-memory user password storage (demo only)
    private Map<String, String> userPasswords = new HashMap<>();


    /**
     * Sends OTP for Signup.
     * Requirement: Email must NOT exist in the database.
     */
    //http://localhost:8080/auth/send-signup-otp
    @PostMapping("/send-signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        // Logic for Signup: Check if email is already registered
        boolean exists = studentRepository.findByEmailId(email).isPresent();

        if (exists) {
            // If it exists, we cannot sign up with this email
            return ResponseEntity.status(HttpStatus.CONFLICT).body("The given mail id already exists or Invalid mail id");
        }

        // Generate and send OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("HackHustle OTP Verification");
        message.setText("Your OTP is: " + otp);
        message.setFrom("hackhustle062@gmail.com");

        mailSender.send(message);

        return ResponseEntity.ok("Signup OTP sent successfully");
    }


    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        // Check if email exists in database
        Student student = studentRepository.findByEmailId(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not registered on platform"));

        String otp = String.format("%06d", new Random().nextInt(999999));

        otpStorage.put(email, otp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("HackHustle OTP Verification");
        message.setText("Your OTP is: " + otp);
        message.setFrom("hackhustle062@gmail.com");

        mailSender.send(message);

        return ResponseEntity.ok("OTP sent successfully");
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");

        if (!otpStorage.containsKey(email)) {
            return ResponseEntity.badRequest().body("OTP not requested");
        }

        String storedOtp = otpStorage.get(email);

        if (!storedOtp.equals(otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        return ResponseEntity.ok("OTP verified successfully");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        Student student = studentRepository.findByEmailId(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Email not registered on platform"));

        String encodedPassword = passwordEncoder.encode(newPassword);
        student.setPassword(encodedPassword);
        studentRepository.save(student);

        otpStorage.remove(email);

        return ResponseEntity.ok("Password reset successful");
    }

}
