package project.HackHustle.controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // Adjust based on your React port
public class AdminController {
    @Value("${hackhustle.admin.email}")
    private String adminEmail;

    @Value("${hackhustle.admin.password}")
    private String adminPassword;
//    System.out.println("HII i am im admin");
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        System.out.println("login");
        String email = credentials.get("email");
        String password = credentials.get("password");
//        System.out.println("Input Email: " + email);
//        System.out.println("Stored Admin Email: " + adminEmail);
        if (adminEmail.equals(email) && adminPassword.equals(password)) {
            // In a real app, you'd generate a JWT token here.
            // For now, we'll return a success message and a dummy token.
            Map<String, String> response = new HashMap<>();
            response.put("token", "admin-session-secure-token-123");
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid Admin Credentials"));
    }
}
