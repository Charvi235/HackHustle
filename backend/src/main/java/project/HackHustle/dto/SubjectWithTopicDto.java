package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectWithTopicDto {

    private Long subjectID;
    private String subjectName;
    private Long totalQuestions;
    private List<TopicDto> topics;
}