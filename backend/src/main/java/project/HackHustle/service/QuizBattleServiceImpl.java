package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.QuizBattleDto;
import project.HackHustle.entity.QuizBattle;
import project.HackHustle.mapper.QuizBattleMapper;
import project.HackHustle.repository.QuizBattleRepository;
import project.HackHustle.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizBattleServiceImpl implements QuizBattleService {

    private final QuizBattleRepository quizBattleRepository;
    private final StudentRepository studentRepository;

    @Override
    public QuizBattleDto saveQuizBattle(QuizBattleDto quizBattleDTO) {

        QuizBattle quizBattle =
                QuizBattleMapper.mapToQuizBattle(quizBattleDTO, studentRepository);

        QuizBattle savedQuizBattle = quizBattleRepository.save(quizBattle);

        return QuizBattleMapper.mapToQuizBattleDto(savedQuizBattle);
    }

    @Override
    public void deleteQuizBattle(Long quizID) {
        quizBattleRepository.deleteById(quizID);
    }

    @Override
    public List<QuizBattleDto> getQuizBattlesByStudent(Long studentId) {

        return quizBattleRepository
                .findByStudent_StudentId(studentId)
                .stream()
                .map(QuizBattleMapper::mapToQuizBattleDto)
                .collect(Collectors.toList());
    }

    @Override
    public QuizBattleDto getQuizBattleByBattleId(String battleId) {

        // Expected format → "quizNumber_playerNumber"
        String[] parts = battleId.split("_");

        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid battleId format. Expected quizNumber_playerNumber");
        }

        Integer quizNumber = Integer.parseInt(parts[0]);
        Integer playerNumber = Integer.parseInt(parts[1]);

        QuizBattle battle = quizBattleRepository
                .findByQuizNumberAndPlayerNumber(quizNumber, playerNumber)
                .orElseThrow(() ->
                        new RuntimeException("QuizBattle not found"));

        return QuizBattleMapper.mapToQuizBattleDto(battle);
    }
}
