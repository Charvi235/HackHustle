package project.HackHustle.mapper;

import project.HackHustle.dto.UserAssessmentDto;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Subject;
import project.HackHustle.entity.Topic;
import project.HackHustle.entity.UserAssessment;

import java.time.LocalDateTime;

public class UserAssessmentMapper {

    public static UserAssessmentDto mapToUserAssessmentDto(UserAssessment userAssessment) {
        if (userAssessment == null) return null;

        UserAssessmentDto dto = new UserAssessmentDto();
        dto.setAssessmentID(userAssessment.getAssessmentID());
        dto.setDate(userAssessment.getDate());
        dto.setEmailId(userAssessment.getStudent().getEmailId());
        dto.setTopicID(userAssessment.getTopic() != null ? userAssessment.getTopic().getTopicID() : null);
        dto.setSubjectID(userAssessment.getSubject().getSubjectID());
        dto.setAssessmentScore(userAssessment.getAssessmentScore());

        return dto;
    }


    public static UserAssessment mapToUserAssessment(UserAssessmentDto dto, Student student, Topic topic, Subject subject) {
        if (dto == null) return null;

        UserAssessment ua = new UserAssessment();
        ua.setAssessmentID(dto.getAssessmentID());
        ua.setDate(LocalDateTime.now());
        ua.setStudent(student);
        ua.setTopic(topic);
        ua.setSubject(subject);
        ua.setAssessmentScore(dto.getAssessmentScore());

        return ua;
    }
}
