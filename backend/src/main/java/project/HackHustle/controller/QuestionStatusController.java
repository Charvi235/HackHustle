package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.QuestionStatusDto;
import project.HackHustle.entity.Question;
import project.HackHustle.entity.QuestionStatus;
import project.HackHustle.entity.QuestionStatusKey;
import project.HackHustle.entity.Student;
import project.HackHustle.repository.QuestionRepository;
import project.HackHustle.repository.QuestionStatusRepository;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.service.QuestionStatusService;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")


@RestController
@RequestMapping("/api/questionstatus")

public class QuestionStatusController {

    private final QuestionStatusService questionStatusService;

    @PostMapping
    public ResponseEntity<String> saveStatus(@RequestBody QuestionStatusDto dto) {
        boolean saved = questionStatusService.saveStatus(dto);
        if(saved)
        {
            return ResponseEntity.ok("success");

        }
        else{
        return ResponseEntity.status(500).body("failed");
    }}
    @GetMapping("/visited")
    public ResponseEntity<List<Long>> getVisitedQuestions(
            @RequestParam String emailId) {

        List<Long> visitedQuestionIds =
                questionStatusService.getListVisited(emailId);

        return ResponseEntity.ok(visitedQuestionIds);
    }
}