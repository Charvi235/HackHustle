package project.HackHustle.mapper;

import project.HackHustle.dto.TopicDto;
import project.HackHustle.entity.Topic;

public class TopicMapper {

    // Entity → DTO
    public static TopicDto mapToTopicDto(Topic topic) {
        if (topic == null) {
            return null;
        }

        return new TopicDto(
                topic.getTopicID(),
                topic.getTopicName()
        );
    }

    // DTO → Entity
    public static Topic mapToTopic(TopicDto topicDto) {
        if (topicDto == null) {
            return null;
        }

        Topic topic = new Topic();
        topic.setTopicID(topicDto.getTopicID());
        topic.setTopicName(topicDto.getTopicName());
        // subject is set in service layer
        return topic;
    }
}
