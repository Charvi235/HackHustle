package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewResultDto {

    private Long interviewResultID;
    private String question_1;
    private String providedAns_1;
    private String betterAns_1;
    private String question_2;
    private String providedAns_2;
    private String betterAns_2;
    private String question_3;
    private String providedAns_3;
    private String betterAns_3;
    private Long interviewScore;
    private Long interviewID;
}
