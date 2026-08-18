package project.HackHustle.service;

public interface EmailService
{
    void sendResetLink(String toEmail, String token);
}
