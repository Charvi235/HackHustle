package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.HackHustle.entity.Subject;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,Long>
{
    @Query(value = "SELECT t.topic_id, " +
            "COUNT(DISTINCT qs.question_id) as solved, " +
            "COUNT(DISTINCT q.question_id) as total " +
            "FROM topic t " +
            "LEFT JOIN question q ON t.topic_id = q.topic_id " +
            "LEFT JOIN question_status qs ON q.question_id = qs.question_id AND qs.student_id = :studentId " +
            "WHERE t.subject_id = :subjectId " +
            "GROUP BY t.topic_id", nativeQuery = true)
    List<Object[]> findProgressDataNative(@Param("studentId") Long studentId, @Param("subjectId") Long subjectId);

    @Query(value = "SELECT s.subject_id, " +
            "COUNT(DISTINCT qs.question_id) as solved, " +
            "COUNT(DISTINCT q.question_id) as total " +
            "FROM subject s " +
            "LEFT JOIN topic t ON s.subject_id = t.subject_id " +
            "LEFT JOIN question q ON t.topic_id = q.topic_id " +
            "LEFT JOIN question_status qs ON q.question_id = qs.question_id AND qs.student_id = :studentId " +
            "GROUP BY s.subject_id", nativeQuery = true)
    List<Object[]> findAllSubjectsProgressNative(@Param("studentId") Long studentId);

    boolean existsBySubjectName(String subjectName);
}
