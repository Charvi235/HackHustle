package project.HackHustle.mapper;

import project.HackHustle.dto.QuizBattleDto;
import project.HackHustle.entity.QuizBattle;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Subject;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.repository.SubjectRepository;

public class QuizBattleMapper {

    // ✅ Entity -> DTO
    public static QuizBattleDto mapToQuizBattleDto(QuizBattle quizBattle) {

        QuizBattleDto dto = new QuizBattleDto();

        dto.setQuizID(quizBattle.getQuizID());
        dto.setQuizNumber(quizBattle.getQuizNumber());
        dto.setPlayerNumber(quizBattle.getPlayerNumber());
        dto.setStudentEmail(quizBattle.getStudent().getEmailId()); // email return
        dto.setQuizScore(quizBattle.getQuizScore());
        dto.setStatus(quizBattle.getStatus());
        dto.setBattleCode(quizBattle.getBattleCode());

        return dto;
    }

    // Mapping DTO -> entity
    public static QuizBattle mapToQuizBattle(
            QuizBattleDto quizBattleDTO,
            StudentRepository studentRepository) {

        // Fetch Student using email
        Student student = studentRepository
                .findByEmailId(quizBattleDTO.getStudentEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found with email: "
                                        + quizBattleDTO.getStudentEmail()
                        )
                );

        QuizBattle quizBattle = new QuizBattle();

        quizBattle.setQuizID(quizBattleDTO.getQuizID());
        quizBattle.setQuizNumber(quizBattleDTO.getQuizNumber());
        quizBattle.setPlayerNumber(quizBattleDTO.getPlayerNumber());
        quizBattle.setStudent(student);
        quizBattle.setQuizScore(quizBattleDTO.getQuizScore());
        quizBattle.setStatus(quizBattleDTO.getStatus());

        return quizBattle;
    }
}
