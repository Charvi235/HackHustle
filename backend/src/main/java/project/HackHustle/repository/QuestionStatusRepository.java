package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.HackHustle.entity.QuestionStatus;
import project.HackHustle.entity.QuestionStatusKey;

import java.util.List;

public interface QuestionStatusRepository extends JpaRepository<QuestionStatus, QuestionStatusKey> {
    //List<QuestionStatus> findByIdStudentId(Long studentId);
    @Query("SELECT qs.id.questionID FROM QuestionStatus qs WHERE qs.id.studentId = :studentId")
    List<Long> findQuestionIdsByStudentId(@Param("studentId") Long studentId);


}
