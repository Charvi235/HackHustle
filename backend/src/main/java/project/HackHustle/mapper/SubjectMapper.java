package project.HackHustle.mapper;

import project.HackHustle.dto.SubjectDto;
import project.HackHustle.entity.Subject;

public class SubjectMapper {

    // Entity → DTO
    public static SubjectDto mapToSubjectDto(Subject subject) {
        if (subject == null) {
            return null;
        }

        return new SubjectDto(
                subject.getSubjectID(),
                subject.getSubjectName(),
                subject.getTotalQuestions()
        );
    }

    // DTO → Entity
    public static Subject mapToSubject(SubjectDto subjectDto) {
        if (subjectDto == null) {
            return null;
        }

        return new Subject(
                subjectDto.getSubjectID(),
                subjectDto.getSubjectName(),
                subjectDto.getTotalQuestions(),
                null   // topics are not set via DTO
        );
    }
}
