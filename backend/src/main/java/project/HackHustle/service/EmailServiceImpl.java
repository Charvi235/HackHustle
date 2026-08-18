package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import project.HackHustle.service.EmailService;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendResetLink(String toEmail, String token) {
        String resetLink = "http://localhost:3000/reset-password?token=" + token; // Change to frontend URL

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request");
        message.setText("Click the following link to reset your password:\n" + resetLink +
                "\nThis link will expire in 15 minutes.");

        mailSender.send(message);
    }
}
