package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.QuizBattle;
import java.util.List;
import java.util.Optional;

public interface QuizBattleRepository extends JpaRepository<QuizBattle, Long> {

    List<QuizBattle> findByStudent_StudentId(Long studentId);

   // List<QuizBattle> findByBattleId(String battleId);
   Optional<QuizBattle> findByQuizNumberAndPlayerNumber(
           Integer quizNumber,
           Integer playerNumber
   );
}
