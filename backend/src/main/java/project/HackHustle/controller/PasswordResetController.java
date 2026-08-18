package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.ForgotPasswordResetDto;
import project.HackHustle.dto.ResetPasswordRequestDto;
import project.HackHustle.service.PasswordResetService;

@RestController
@RequestMapping("/api/password")
@AllArgsConstructor
public class PasswordResetController
{
    private final PasswordResetService passwordResetService;

    // ------------------ Forgot Password ------------------
    //http://localhost:8080/api/password/forgot
    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordResetDto requestDTO) {

        try {
            passwordResetService.forgotPassword(requestDTO);
            // Always return generic message for security
            return ResponseEntity.ok("If your email exists in our system, a reset link has been sent.");
        } catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // ------------------ Validate Token ------------------
    //http://localhost:8080/api/password/validate
    //Eg: http://localhost:8080/api/password/validate?token=3c3a441d-e4ca-46e0-a1fc-1685ca749ac5
    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestParam("token") String token) {
        boolean isValid = passwordResetService.validateToken(token);
        if (isValid) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is invalid or expired");
        }
    }

    // ------------------ Reset Password ------------------
    //http://localhost:8080/api/password/reset
    //Eg: http://localhost:8080/api/password/reset?Content-Type=application/json
    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequestDto requestDTO) {
        try {
            passwordResetService.resetPassword(requestDTO);
            return ResponseEntity.ok("Password has been successfully reset");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
