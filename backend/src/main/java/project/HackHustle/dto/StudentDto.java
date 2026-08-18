package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class StudentDto
{
    private Long studentId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;
    private Long points;
    private Long quizAttempted;
}
