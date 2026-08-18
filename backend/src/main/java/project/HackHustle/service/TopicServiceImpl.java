package project.HackHustle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.TopicDto;
import project.HackHustle.entity.Subject;
import project.HackHustle.entity.Topic;
import project.HackHustle.mapper.TopicMapper;
import project.HackHustle.repository.SubjectRepository;
import project.HackHustle.repository.TopicRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;
    private final SubjectRepository subjectRepository;
    @Override
    public List<TopicDto> getTopicsBySubjectId(Long subjectID) {
        List<Topic> topics = topicRepository.findBySubject_SubjectID(subjectID);

        return topics.stream()
                .map(TopicMapper::mapToTopicDto)
                .collect(Collectors.toList());
    }
    @Override
    public TopicDto createTopic(Long subjectId, TopicDto dto) {

        if (dto.getTopicName() == null || dto.getTopicName().trim().isEmpty()) {
            throw new RuntimeException("Topic name cannot be empty");
        }

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        // prevent duplicate topic under same subject
        if (topicRepository.existsByTopicNameAndSubject_SubjectID(
                dto.getTopicName(), subjectId)) {
            throw new RuntimeException("Topic already exists in this subject");
        }

        Topic topic = new Topic();
        topic.setTopicName(dto.getTopicName().trim());
        topic.setSubject(subject); // FK mapping

        Topic saved = topicRepository.save(topic);

        return TopicMapper.mapToTopicDto(saved);
    }
    @Override
    public void deleteTopic(Long topicId) {

        if (!topicRepository.existsById(topicId)) {
            throw new RuntimeException("Topic not found");
        }

        topicRepository.deleteById(topicId);
    }
    @Override
    public TopicDto renameTopic(Long topicId, String newName) {

        if (newName == null || newName.trim().isEmpty()) {
            throw new RuntimeException("Topic name cannot be empty");
        }

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        // optional: prevent duplicate after rename
        if (topicRepository.existsByTopicNameAndSubject_SubjectID(
                newName, topic.getSubject().getSubjectID())) {
            throw new RuntimeException("Topic already exists in this subject");
        }

        topic.setTopicName(newName.trim());

        Topic updated = topicRepository.save(topic);

        return TopicMapper.mapToTopicDto(updated);
    }
    @Override
    public long countTopicsBySubjectId(Long subjectID) {
        return topicRepository.countBySubject_SubjectID(subjectID);
    }
}
