package project.HackHustle.service;

import org.springframework.stereotype.Service;
import project.HackHustle.dto.QuestionDto;
import project.HackHustle.entity.Question;
import project.HackHustle.entity.Topic;
import project.HackHustle.mapper.QuestionMapper;
import project.HackHustle.repository.QuestionRepository;
import project.HackHustle.repository.TopicRepository;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class QuestionServiceImpl implements QuestionService{
    private final QuestionRepository questionRepository;
    private final TopicRepository topicRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository, TopicRepository topicRepository)
    {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public QuestionDto addQuestion(QuestionDto questionDto)
    {
        // Fetch Topic using topicName from DTO
        Topic topic = topicRepository.findByTopicName(questionDto.getTopicName())
                .orElseThrow(() -> new RuntimeException(
                        "Topic not found: " + questionDto.getTopicName()));
        Question question = QuestionMapper.mapToQuestion(questionDto, topic);
        Question savedQuestion = questionRepository.save(question);
        return QuestionMapper.mapToQuestionDto(savedQuestion);
    }

    @Override
    public QuestionDto updateQuestion(Long id, QuestionDto questionDto)
    {
        Question existingQuestion = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
        // Update fields
        existingQuestion.setQuestionText(questionDto.getQuestionText());
        existingQuestion.setOption1(questionDto.getOption1());
        existingQuestion.setOption2(questionDto.getOption2());
        existingQuestion.setOption3(questionDto.getOption3());
        existingQuestion.setOption4(questionDto.getOption4());
        existingQuestion.setCorrectAnswer(questionDto.getCorrectAnswer());

        //Handle Topic change (IMPORTANT)
        if (questionDto.getTopicName() != null) {
            Topic topic = topicRepository.findByTopicName(questionDto.getTopicName())
                    .orElseThrow(() -> new RuntimeException(
                            "Topic not found: " + questionDto.getTopicName()));

            existingQuestion.setTopic(topic);
        }
        Question updatedQuestion = questionRepository.save(existingQuestion);
        return QuestionMapper.mapToQuestionDto(updatedQuestion);
    }

    @Override
    public void deleteQuestion(Long id) {

        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        questionRepository.delete(question);
    }

    @Override
    public List<QuestionDto> getQuestionByTopicId(Long topicId) {

        List<Question> questions = questionRepository.findByTopic_TopicID(topicId);

        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionDto> getQuestionByTopic(String topicName) {
        List<Question> questions =
                questionRepository.findByTopic_TopicName(topicName);

        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<QuestionDto> getQuestionByTopicAssesment(String topicName) {
        List<Question> questions =
                questionRepository.findRandom20ByTopic(topicName);

        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<QuestionDto> getQuestionBySubject(Long subjectID) {
        List<Question> questions =
                questionRepository.findRandom20BySubject(subjectID);


        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }
    @Override
    public List<QuestionDto> getQuestionForQuiz() {

        List<Question> questions = questionRepository.findRandom10();

        return questions.stream()
                .map(QuestionMapper::mapToQuestionDto)
                .collect(Collectors.toList());
    }
}
