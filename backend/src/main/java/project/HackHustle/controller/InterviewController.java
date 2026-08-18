package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.InterviewDto;
import project.HackHustle.entity.Interview;
import project.HackHustle.service.InterviewService;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;
    @PostMapping("/save")
    public ResponseEntity<Void> saveInterview(@RequestBody InterviewDto interviewDto)
    {
        interviewService.saveInterview(interviewDto);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<InterviewDto>> getInterviewsById(@PathVariable Long studentId) {
        List<InterviewDto> interviews = interviewService.getAllInterview(studentId);

        if (interviews.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 if no interviews found
        }

        return ResponseEntity.ok(interviews); // 200 OK with list
    }

}
