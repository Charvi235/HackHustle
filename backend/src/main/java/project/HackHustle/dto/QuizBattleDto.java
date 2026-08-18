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
public class QuizBattleDto
{
    private Long quizID;

    private Integer quizNumber;

    private Integer playerNumber;

    private String studentEmail;

    private Long quizScore;

    private String status;

    private String battleCode;
}