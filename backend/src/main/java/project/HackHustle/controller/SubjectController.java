package project.HackHustle.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.SubjectProgressResponseDto;
import project.HackHustle.dto.SubjectWithTopicDto;
import project.HackHustle.dto.TopicProgressResponseDto;
import project.HackHustle.dto.SubjectDto;
import project.HackHustle.service.SubjectService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    //http://localhost:8080/api/subjects
    @GetMapping
    public ResponseEntity<List<SubjectDto>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    //http://localhost:8080/api/subjects/1001
    @GetMapping("/{subjectId}")
    public ResponseEntity<SubjectDto> getSubjectById(@PathVariable Long subjectId) {
        return ResponseEntity.ok(subjectService.getSubjectById(subjectId));
    }

    //http://localhost:8080/api/subjects/progress/email/subjectId
    @GetMapping("/progress/{emailId}/{subjectId}")
    public ResponseEntity<List<TopicProgressResponseDto>> getProgress(@PathVariable String emailId, @PathVariable Long subjectId)
    {
        return ResponseEntity.ok(subjectService.getStudentProgress(emailId, subjectId));
    }

    //http://localhost:8080/api/subjects/progress/subjects/email
    @GetMapping("/progress/subjects/{emailId}")
    public ResponseEntity<List<SubjectProgressResponseDto>> getAllSubjectsProgress(@PathVariable String emailId)
    {
        return ResponseEntity.ok(subjectService.getAllSubjectsProgress(emailId));
    }
    @PostMapping
    public ResponseEntity<SubjectDto> createSubject(@RequestBody SubjectDto dto) {

        return ResponseEntity.ok(subjectService.createSubject(dto));
    }
    @DeleteMapping("/delete/{subjectId}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long subjectId) {
        subjectService.deleteSubject(subjectId);
        return ResponseEntity.ok("Subject deleted successfully");
    }
    
    @PatchMapping("/rename/{subjectId}")
    public ResponseEntity<SubjectDto> renameSubject(
            @PathVariable Long subjectId,
            @RequestBody SubjectDto dto) {

        return ResponseEntity.ok(
                subjectService.renameSubject(subjectId, dto.getSubjectName())
        );
    }
    @GetMapping("/with-topics")
    public ResponseEntity<List<SubjectWithTopicDto>> getSubjectsWithTopics() {
        return ResponseEntity.ok(subjectService.getAllSubjectsWithTopics());
    }
}
