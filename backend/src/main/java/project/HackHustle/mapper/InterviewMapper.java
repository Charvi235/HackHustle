package project.HackHustle.mapper;

import project.HackHustle.dto.InterviewDto;
import project.HackHustle.entity.Interview;
import project.HackHustle.entity.Student;
import project.HackHustle.repository.StudentRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class InterviewMapper {

    public static Interview mapToInterview(InterviewDto dto, Student student) {
        Interview interview = new Interview();
        interview.setInterviewID(dto.getInterviewID());
        interview.setDate(LocalDateTime.now());
        interview.setStudent(student);
        return interview;
    }


        public static InterviewDto mapToInterviewDto(Interview interview)
    {
       return  new InterviewDto(
                interview.getInterviewID(),
                interview.getStudent().getStudentId()
        );
    }
}
