package project.HackHustle.service;

import project.HackHustle.dto.InterviewDto;

import java.util.List;

public interface InterviewService {

    void saveInterview(InterviewDto interviewDto);
    List<InterviewDto> getAllInterview(Long id);
}
