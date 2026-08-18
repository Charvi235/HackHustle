package project.HackHustle.mapper;

import project.HackHustle.dto.QuestionStatusDto;
import project.HackHustle.entity.Question;
import project.HackHustle.entity.QuestionStatus;
import project.HackHustle.entity.QuestionStatusKey;
import project.HackHustle.entity.Student;


public class QuestionStatusMapper {

    public static QuestionStatus toEntity(
            Question question,
            Student student,
            String status
    ) {
        QuestionStatusKey key = new QuestionStatusKey(
                question.getQuestionID(),
                student.getStudentId()
        );

        QuestionStatus qs = new QuestionStatus();
        qs.setId(key);
        qs.setQuestion(question);
        qs.setStudent(student);
        qs.setStatus(status);

        return qs;
    }
}
