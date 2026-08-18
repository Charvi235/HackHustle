package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDto
{
    private Long teacherId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;
    private Double rating;
    private String subjectAssociated;
    private String institute;
    private String department;
    private String designation;
    private String experience;
    private Integer numberOfRatings;
}
