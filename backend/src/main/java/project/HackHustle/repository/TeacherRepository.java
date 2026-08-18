package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Teacher;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher,Long>
{
    Optional<Teacher> findByEmailId(String emailId);
    List<Teacher> findBySubjectAssociated(String subjectAssociated);
}
