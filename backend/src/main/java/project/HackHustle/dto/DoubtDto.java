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

public class DoubtDto {

    private Long doubtID;
    private String  doubtStatus;
    private LocalDateTime date;
    private String queryAsked;
    private String answerProvided;
    private Long  studentId;
    private Long teacherID;
    private String selectedSubject;
}
