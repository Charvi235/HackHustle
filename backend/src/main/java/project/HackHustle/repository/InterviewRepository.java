package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.Interview;

import java.util.List;

public interface InterviewRepository  extends JpaRepository<Interview,Long> {
    List<Interview> findByStudent_StudentId(Long studentId);

}
