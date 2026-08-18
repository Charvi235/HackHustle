package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.QuestionStatusDto;
import project.HackHustle.entity.Question;
import project.HackHustle.entity.QuestionStatus;
import project.HackHustle.entity.QuestionStatusKey;
import project.HackHustle.entity.Student;
import project.HackHustle.mapper.QuestionStatusMapper;
import project.HackHustle.repository.QuestionRepository;
import project.HackHustle.repository.QuestionStatusRepository;
import project.HackHustle.repository.StudentRepository;

import java.util.List;

//
//@Service
//public class QuestionStatusServiceImpl  implements QuestionStatusService{
//
//  private final QuestionStatusRepository questionStatusRepository;
//
//    public QuestionStatusServiceImpl(QuestionStatusRepository questionStatusRepository) {
//        this.questionStatusRepository = questionStatusRepository;
//    }
//
//    @Override
//    public boolean saveStatus(QuestionStatusDto questionStatusDto) {
//
//        QuestionStatus questionStatus = QuestionStatusMapper.maptoQuestionStatus(questionStatusDto);
//       QuestionStatus saved =  questionStatusRepository.save(questionStatus);
//       return saved != null;
//    }
//}
@Service
@AllArgsConstructor
public class QuestionStatusServiceImpl implements QuestionStatusService {

    private final QuestionStatusRepository questionStatusRepository;
    private final StudentRepository studentRepository;
    private final QuestionRepository questionRepository;

    @Override
    public boolean saveStatus(QuestionStatusDto questionStatusDto) {

        // 1. Fetch Student using email
        Student student = studentRepository.findByEmailId(questionStatusDto.getEmailId())
                .orElseThrow(() -> new RuntimeException("Student not found with email"));

        // 2. Fetch Question
        Question question = questionRepository.findById(questionStatusDto.getQuestionID())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // 3. Build composite key
        QuestionStatusKey key = new QuestionStatusKey(
                question.getQuestionID(),
                student.getStudentId()
        );

        // 4. Build entity
        QuestionStatus status = new QuestionStatus();
        status.setId(key);
        status.setStudent(student);
        status.setQuestion(question);
        status.setStatus("true");

        questionStatusRepository.save(status);
        return true;
    }

    @Override
    public List<Long> getListVisited(String emailId) {
        Student student = studentRepository.findByEmailId(emailId)
                .orElseThrow(() -> new RuntimeException("Student not found with email"));
        return questionStatusRepository.findQuestionIdsByStudentId(student.getStudentId());

    }
}

