package project.HackHustle.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.QuestionDto;
import project.HackHustle.service.QuestionService;
import java.util.List;

@RestController
@RequestMapping("/api/question")
public class QuestionController
{
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService)
    {
        this.questionService = questionService;
    }

    //http://localhost:8080/api/question
    @PostMapping
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody QuestionDto questionDto) {
        QuestionDto savedQuestion = questionService.addQuestion(questionDto);
        return ResponseEntity.ok(savedQuestion);
    }

    //http://localhost:8080/api/question/update/1001
    @PutMapping("update/{id}")
    public ResponseEntity<QuestionDto> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionDto questionDto) {

        QuestionDto updatedQuestion = questionService.updateQuestion(id, questionDto);
        return ResponseEntity.ok(updatedQuestion);
    }

    //http://localhost:8080/api/question/delete/1001
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully");
    }

    //http://localhost:8080/api/question/topic/id/1001
    @GetMapping("/topic/id/{topicId}")
    public ResponseEntity<List<QuestionDto>> getQuestionByTopicId(@PathVariable Long topicId) {

        List<QuestionDto> list = questionService.getQuestionByTopicId(topicId);

        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/question/topic/normalization
    @GetMapping("/topic/{topicName}")
    public ResponseEntity<List<QuestionDto>>  getQuestionByTopic(@PathVariable String topicName)
    {
        List<QuestionDto> list = questionService.getQuestionByTopic(topicName);
        //if with this topic there exist no questions
        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/question/topic/assessment/normalization
    @GetMapping("/topic/assessment/{topicName}")
    public ResponseEntity<List<QuestionDto>>  getQuestionByTopicAssesment(@PathVariable String topicName)
    {
        List<QuestionDto> list = questionService.getQuestionByTopicAssesment(topicName);
        //if with this topic there exist no questions
        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/question/subject/1001
    @GetMapping("/subject/{subjectID}")
    public ResponseEntity<List<QuestionDto>>  getQuestionBySubject (@PathVariable Long subjectID)
    {
        List<QuestionDto> list = questionService.getQuestionBySubject(subjectID);
        //if with this topic there exist no questions
        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/question/quiz
    @GetMapping("/quiz")
    public ResponseEntity<List<QuestionDto>> getQuestionsForQuiz() {

        List<QuestionDto> list = questionService.getQuestionForQuiz();

        if (list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(list);
    }
}
