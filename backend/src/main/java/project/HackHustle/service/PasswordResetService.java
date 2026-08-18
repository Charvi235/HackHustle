package project.HackHustle.service;

import project.HackHustle.dto.ForgotPasswordResetDto;
import project.HackHustle.dto.ResetPasswordRequestDto;

public interface PasswordResetService
{

    //Handles forgot password request: generate and save token, send email
    void forgotPassword(ForgotPasswordResetDto requestDTO);

    //Validates if the reset token is valid and not expired/used
    boolean validateToken(String token);

    //Resets the password using the provided token and new password
    void resetPassword(ResetPasswordRequestDto requestDTO);
}
