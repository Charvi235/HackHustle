package project.HackHustle.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.TopicDto;
import project.HackHustle.service.TopicService;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TopicController {

    private final TopicService topicService;

    //http://localhost:8080/api/topics/subject/1001
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<TopicDto>> getTopicsBySubjectId(@PathVariable Long subjectId) {
        return ResponseEntity.ok(topicService.getTopicsBySubjectId(subjectId));
    }

    //http://localhost:8080/api/topics/subject/1001/count
    @GetMapping("/subject/{subjectId}/count")
    public ResponseEntity<Long> countTopicsBySubjectId(@PathVariable Long subjectId) {
        return ResponseEntity.ok(topicService.countTopicsBySubjectId(subjectId));
    }
    @PostMapping("/subject/{subjectId}")
    public ResponseEntity<TopicDto> createTopic(
            @PathVariable Long subjectId,
            @RequestBody TopicDto dto) {

        return ResponseEntity.ok(topicService.createTopic(subjectId, dto));
    }
    @DeleteMapping("/delete/{topicId}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long topicId) {
        topicService.deleteTopic(topicId);
        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/rename/ {topicId}")
    public ResponseEntity<TopicDto> renameTopic(
            @PathVariable Long topicId,
            @RequestBody TopicDto dto) {

        return ResponseEntity.ok(
                topicService.renameTopic(topicId, dto.getTopicName())
        );
    }
}
