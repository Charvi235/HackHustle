package project.HackHustle.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.UserAssessmentDto;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Subject;
import project.HackHustle.entity.Topic;
import project.HackHustle.service.UserAssessmentService;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class UserAssessmentController {

    private final UserAssessmentService userAssessmentService;

   //http://localhost:8080/api/assessments
    @PostMapping
    public ResponseEntity<UserAssessmentDto> createAssessment(@RequestBody UserAssessmentDto dto) {
        UserAssessmentDto created = userAssessmentService.createAssessment(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    //http://localhost:8080/api/assessments
    @GetMapping
    public ResponseEntity<List<UserAssessmentDto>> getAllAssessments() {
        List<UserAssessmentDto> assessments = userAssessmentService.getAllAssessments();
        return ResponseEntity.ok(assessments);
    }

    //http://localhost:8080/api/assessments/1001
    @GetMapping("/{id}")
    public ResponseEntity<UserAssessmentDto> getAssessmentById(@PathVariable("id") Long id) {
        UserAssessmentDto dto = userAssessmentService.getAssessmentById(id);
        return ResponseEntity.ok(dto);
    }

    //http://localhost:8080/api/assessments/student/1001
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<UserAssessmentDto>> getAssessmentsByStudent(@PathVariable("studentId") Long studentId) {
        Student student = new Student();
        student.setStudentId(studentId);
        List<UserAssessmentDto> list = userAssessmentService.getAssessmentsByStudent(student);
        return ResponseEntity.ok(list);
    }
    //http://localhost:8080/api/assessments/topic/1001
    @GetMapping("/topic/{topicId}")
    public ResponseEntity<List<UserAssessmentDto>> getAssessmentsByTopic(@PathVariable("topicId") Long topicId) {
        Topic topic = new Topic();
        topic.setTopicID(topicId);
        List<UserAssessmentDto> list = userAssessmentService.getAssessmentsByTopic(topic);
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/assessments/subject/1001
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<UserAssessmentDto>> getAssessmentsBySubject(@PathVariable("subjectId") Long subjectId) {
        Subject subject = new Subject();
        subject.setSubjectID(subjectId);
        List<UserAssessmentDto> list = userAssessmentService.getAssessmentsBySubject(subject);
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/assessments/student/1001/topic/1001
    @GetMapping("/student/{studentId}/topic/{topicId}")
    public ResponseEntity<List<UserAssessmentDto>> getAssessmentsByStudentAndTopic(
            @PathVariable("studentId") Long studentId,
            @PathVariable("topicId") Long topicId) {
        Student student = new Student();
        student.setStudentId(studentId);
        Topic topic = new Topic();
        topic.setTopicID(topicId);
        List<UserAssessmentDto> list = userAssessmentService.getAssessmentsByStudentAndTopic(student, topic);
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/assessments/student/1001/subject/1001
    @GetMapping("/student/{studentId}/subject/{subjectId}")
    public ResponseEntity<List<UserAssessmentDto>> getAssessmentsByStudentAndSubject(
            @PathVariable("studentId") Long studentId,
            @PathVariable("subjectId") Long subjectId) {
        Student student = new Student();
        student.setStudentId(studentId);
        Subject subject = new Subject();
        subject.setSubjectID(subjectId);
        List<UserAssessmentDto> list = userAssessmentService.getAssessmentsByStudentAndSubject(student, subject);
        return ResponseEntity.ok(list);
    }

    //http://localhost:8080/api/assessments/1001
    @PutMapping("/{id}")
    public ResponseEntity<UserAssessmentDto> updateAssessment(
            @PathVariable("id") Long id,
            @RequestBody UserAssessmentDto dto) {
        UserAssessmentDto updated = userAssessmentService.updateAssessment(id, dto);
        return ResponseEntity.ok(updated);
    }

    //http://localhost:8080/api/assessments/1001
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable("id") Long id) {
        userAssessmentService.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }
}
