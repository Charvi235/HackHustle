package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.HackHustle.entity.Question;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<Question,Long> {
    @Query(
            value = """
        SELECT q.*
        FROM question q
        JOIN topic t ON q.topic_id = t.topic_id
        WHERE t.topic_name = :topicName
        ORDER BY RAND()
        LIMIT 20
        """,
            nativeQuery = true
    )
List<Question> findRandom20ByTopic(@Param("topicName") String TopicName);
    List<Question> findByTopic_TopicName(String topicName);
    List<Question> findByTopic_TopicID(Long topicId);

    List<Question> findByTopic_Subject_SubjectID(Long subjectID);

    @Query(
            value = """
        SELECT q.*
        FROM question q
        JOIN topic t ON q.topic_id = t.topic_id
        WHERE t.subject_id = :subjectId
        ORDER BY RAND()
        LIMIT 20
        """,
            nativeQuery = true
    )
    List<Question> findRandom20BySubject(@Param("subjectId") Long subjectId);

    @Query(
            value = """
        SELECT *
        FROM question
        ORDER BY RAND()
        LIMIT 10
        """,
            nativeQuery = true
    )
    List<Question> findRandom10();
}
