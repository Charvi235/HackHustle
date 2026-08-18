package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.InterviewResultDto;
import project.HackHustle.service.InterviewResultService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/result")
public class InterviewResultController {

    private final InterviewResultService interviewResultService;

    @PostMapping("/save")
   public ResponseEntity<Void> saveInterviewResult(@RequestBody InterviewResultDto interviewResultDto)
   {
       interviewResultService.saveInterviewResult(interviewResultDto);
       return ResponseEntity.ok().build();
   }

   @GetMapping("/{id}")
   public ResponseEntity<InterviewResultDto> getInterview(@PathVariable Long id) // this one is the interviewid
   {
       InterviewResultDto interviewResultDto = interviewResultService.getInterview(id);
       return ResponseEntity.ok(interviewResultDto);

   }
}
