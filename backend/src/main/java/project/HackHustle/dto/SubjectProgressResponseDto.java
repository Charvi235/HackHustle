package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectProgressResponseDto {
    private Long subjectId;
    private Long solvedQuestions;
    private Long totalQuestions;
    private Double completionPercentage;
}