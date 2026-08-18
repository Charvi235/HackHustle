package project.HackHustle.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.ForgotPasswordResetDto;
import project.HackHustle.dto.ResetPasswordRequestDto;
import project.HackHustle.entity.PasswordResetToken;
import project.HackHustle.repository.PasswordResetTokenRepository;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.repository.TeacherRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService
{
    private final PasswordResetTokenRepository tokenRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private static final int EXPIRATION_MINUTES = 15;

    // ------------------ Forgot Password ------------------
    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordResetDto requestDTO) {
        String email = requestDTO.getEmail();

        // Check if email exists in Student or Teacher
        boolean isStudent = studentRepository.findByEmailId(email).isPresent();
        boolean isTeacher = teacherRepository.findByEmailId(email).isPresent();

        if (!isStudent && !isTeacher) {
            // Silent return for security — do not reveal if email exists
            return;
        }

        // Delete old tokens for this email
        tokenRepository.deleteByEmail(email);

        // Generate new token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setEmail(email);
        resetToken.setExpiryTime(expiryTime);
        resetToken.setUsed(false);

        tokenRepository.save(resetToken);

        // Send email to user with reset link pointing to frontend
        String resetLink = "http://localhost:3000/reset-password?token=" + token; // Replace with your frontend URL
        emailService.sendResetLink(email, resetLink);
    }

    // ------------------ Validate Token ------------------
    @Override
    public boolean validateToken(String token) {
        Optional<PasswordResetToken> optionalToken = tokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) return false;

        PasswordResetToken resetToken = optionalToken.get();

        // Token is valid if not used and not expired
        return !resetToken.isUsed() && resetToken.getExpiryTime().isAfter(LocalDateTime.now());
    }

    // ------------------ Reset Password ------------------
    @Override
    public void resetPassword(ResetPasswordRequestDto requestDTO) {
        String token = requestDTO.getToken();
        String newPassword = requestDTO.getNewPassword();

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));

        if (resetToken.isUsed() || resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired or already used");
        }

        String email = resetToken.getEmail();
        String encodedPassword = passwordEncoder.encode(newPassword);

        // Update Student password if exists
        studentRepository.findByEmailId(email).ifPresent(student -> {
            student.setPassword(encodedPassword);
            studentRepository.save(student);
        });

        // Update Teacher password if exists
        teacherRepository.findByEmailId(email).ifPresent(teacher -> {
            teacher.setPassword(encodedPassword);
            teacherRepository.save(teacher);
        });

        // Mark token as used
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }
}
