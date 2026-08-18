package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.QuizBattleDto;
import project.HackHustle.service.QuizBattleService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/battle")
public class QuizBattleController {

    private final QuizBattleService quizBattleService;

    @PostMapping("/create")
    public ResponseEntity<QuizBattleDto> createQuizBattle(
            @RequestBody QuizBattleDto quizBattleDTO) {

        QuizBattleDto savedQuizBattle =
                quizBattleService.saveQuizBattle(quizBattleDTO);

        return new ResponseEntity<>(savedQuizBattle, HttpStatus.CREATED);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<QuizBattleDto>> getQuizBattlesByStudent(
            @PathVariable Long studentId) {

        List<QuizBattleDto> battles =
                quizBattleService.getQuizBattlesByStudent(studentId);

        return new ResponseEntity<>(battles, HttpStatus.OK);
    }

    @GetMapping("/{battleId}")
    public ResponseEntity<QuizBattleDto> getQuizBattleByBattleId(
            @PathVariable String battleId) {

        QuizBattleDto battle =
                quizBattleService.getQuizBattleByBattleId(battleId);

        return new ResponseEntity<>(battle, HttpStatus.OK);
    }

    @DeleteMapping("/quiz/{quizID}")
    public ResponseEntity<String> deleteQuizBattle(
            @PathVariable Long quizID) {

        quizBattleService.deleteQuizBattle(quizID);
        return ResponseEntity.ok("QuizBattle deleted successfully");
    }
}
