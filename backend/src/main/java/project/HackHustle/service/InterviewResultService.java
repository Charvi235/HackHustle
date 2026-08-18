package project.HackHustle.service;

import org.springframework.http.ResponseEntity;
import project.HackHustle.dto.InterviewDto;
import project.HackHustle.dto.InterviewResultDto;

import java.util.List;

public interface InterviewResultService {

    public void  saveInterviewResult(InterviewResultDto interviewResultDto);

    public InterviewResultDto getInterview(Long studentId);
}
