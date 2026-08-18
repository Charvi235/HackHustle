package project.HackHustle.mapper;

import project.HackHustle.dto.QuestionDto;
import project.HackHustle.entity.Question;
import project.HackHustle.entity.Topic;

public class QuestionMapper {


    public static QuestionDto mapToQuestionDto(Question question)
    {
        if(question==null) return null;
        QuestionDto dto = new QuestionDto();
        dto.setQuestionID(question.getQuestionID());
        dto.setQuestionText(question.getQuestionText());
        dto.setOption1(question.getOption1());
        dto.setOption2(question.getOption2());
        dto.setOption3(question.getOption3());
        dto.setOption4(question.getOption4());
        dto.setCorrectAnswer(question.getCorrectAnswer());


        dto.setTopicName(question.getTopic().getTopicName());

        return dto;
    }


    public static Question mapToQuestion(QuestionDto questionDto, Topic topic)
    {

        if (questionDto == null) return null;
        Question question = new Question();
        question.setQuestionID(questionDto.getQuestionID());
        question.setQuestionText(questionDto.getQuestionText());
        question.setOption1(questionDto.getOption1());
        question.setOption2(questionDto.getOption2());
        question.setOption3(questionDto.getOption3());
        question.setOption4(questionDto.getOption4());
        question.setCorrectAnswer(questionDto.getCorrectAnswer());

        question.setTopic(topic);

        return question;
    }
}
