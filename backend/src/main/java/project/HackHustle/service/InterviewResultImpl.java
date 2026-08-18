package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.InterviewDto;
import project.HackHustle.dto.InterviewResultDto;
import project.HackHustle.entity.Interview;
import project.HackHustle.entity.InterviewResult;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.mapper.InterviewMapper;
import project.HackHustle.mapper.InterviewResultMapper;
import project.HackHustle.repository.InterviewRepository;
import project.HackHustle.repository.InterviewResultRepository;

import java.util.List;
import java.util.Optional;



@Service
@AllArgsConstructor
public class InterviewResultImpl implements InterviewResultService{

    private  final InterviewResultRepository interviewResultRepository;
    private final InterviewRepository interviewRepository;

    @Override
    public void saveInterviewResult(InterviewResultDto dto) {

        Interview interview = interviewRepository.findById(dto.getInterviewID())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Interview not found with id: " + dto.getInterviewID()));

        InterviewResult interviewResult =
                InterviewResultMapper.mapToInterviewResult(dto, interview);

        interviewResultRepository.save(interviewResult);
    }

    @Override
    public InterviewResultDto getInterview(Long interviewID) {

        InterviewResult result =
                interviewResultRepository
                        .findByInterview_InterviewID(interviewID)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "InterviewResult not found for interview id: " + interviewID));

        return InterviewResultMapper.mapToInterviewResultDto(result);
    }


}
