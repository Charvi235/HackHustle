package project.HackHustle.service;

import project.HackHustle.dto.TopicDto;
import java.util.List;

public interface TopicService {

    List<TopicDto> getTopicsBySubjectId(Long subjectID);

    long countTopicsBySubjectId(Long subjectID);
    TopicDto createTopic(Long subjectId, TopicDto dto);

    void deleteTopic(Long topicId);

    TopicDto renameTopic(Long topicId, String newName);
}
