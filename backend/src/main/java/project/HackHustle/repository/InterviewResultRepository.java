package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.Interview;
import project.HackHustle.entity.InterviewResult;

import java.util.List;
import java.util.Optional;

public interface InterviewResultRepository  extends JpaRepository<InterviewResult,Long> {

    //List<InterviewResult> findByInterview_Student_Id(Long studentId);

    Optional<InterviewResult> findByInterview_InterviewID(Long interviewID);
   // List<InterviewResult> findByInterview_Student_StudentId(Long studentId);
}
