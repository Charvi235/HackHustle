package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.HackHustle.entity.*;

import java.util.List;

@Repository
public interface UserAssessmentRepository extends JpaRepository<UserAssessment, Long> {

    // Find all assessments for a given student
    List<UserAssessment> findByStudent(Student student);

    // Find all assessments for a given topic
    List<UserAssessment> findByTopic(Topic topic);

    // Find all assessments for a given subject
    List<UserAssessment> findBySubject(Subject subject);

    // Find all assessments for a student in a specific topic
    List<UserAssessment> findByStudentAndTopic(Student student, Topic topic);

    // Find all assessments for a student under a subject
    List<UserAssessment> findByStudentAndSubject(Student student,Subject subject);

    // Count total assessments for a student
    long countByStudent(Student student);

    // Count total assessments for a topic
    long countByTopic(Topic topic);

}
