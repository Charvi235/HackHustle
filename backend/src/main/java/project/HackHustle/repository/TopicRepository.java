package project.HackHustle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.HackHustle.entity.Topic;

import java.util.List;
import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findBySubject_SubjectID(Long subjectID);

    long countBySubject_SubjectID(Long subjectID);

    Optional<Topic> findByTopicName(String topicName);
    boolean existsByTopicNameAndSubject_SubjectID(String topicName, Long subjectId);
}
