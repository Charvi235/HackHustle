package project.HackHustle.mapper;

import project.HackHustle.dto.InterviewResultDto;
import project.HackHustle.entity.Interview;
import project.HackHustle.entity.InterviewResult;
import project.HackHustle.repository.InterviewRepository;

import java.util.Optional;

public class InterviewResultMapper {

    public static InterviewResult mapToInterviewResult(
            InterviewResultDto dto,
            Interview interview
    ) {
        return new InterviewResult(
                dto.getInterviewResultID(),
                dto.getQuestion_1(),
                dto.getProvidedAns_1(),
                dto.getBetterAns_1(),
                dto.getQuestion_2(),
                dto.getProvidedAns_2(),
                dto.getBetterAns_2(),
                dto.getQuestion_3(),
                dto.getProvidedAns_3(),
                dto.getBetterAns_3(),
                dto.getInterviewScore(),
                interview
        );
    }

    public static InterviewResultDto mapToInterviewResultDto(
            InterviewResult interviewResult
    ) {
        return new InterviewResultDto(
                interviewResult.getInterviewResultID(),
                interviewResult.getQuestion_1(),
                interviewResult.getProvidedAns_1(),
                interviewResult.getBetterAns_1(),
                interviewResult.getQuestion_2(),
                interviewResult.getProvidedAns_2(),
                interviewResult.getBetterAns_2(),
                interviewResult.getQuestion_3(),
                interviewResult.getProvidedAns_3(),
                interviewResult.getBetterAns_3(),
                interviewResult.getInterviewScore(),
                interviewResult.getInterview().getInterviewID()
        );
    }
}
