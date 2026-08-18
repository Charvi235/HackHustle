package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAssessmentDto {

    private Long assessmentID;

    private LocalDateTime date;

    private String emailId;

    private Long topicID;

    private Long subjectID;

    private Long assessmentScore;
}
