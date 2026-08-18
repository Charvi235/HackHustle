package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.Doubt;

import java.util.List;

public interface DoubtRepository extends JpaRepository<Doubt,Long>
{
    List<Doubt> findByStudent_StudentId(Long studentId);
    List<Doubt> findByTeacher_TeacherIDAndDoubtStatus(Long teacherID, String doubtStatus);
}
