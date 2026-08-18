package project.HackHustle.service;

import project.HackHustle.dto.UserAssessmentDto;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Subject;
import project.HackHustle.entity.Topic;

import java.util.List;

public interface UserAssessmentService {

    UserAssessmentDto createAssessment(UserAssessmentDto dto);

    List<UserAssessmentDto> getAllAssessments();

    UserAssessmentDto getAssessmentById(Long assessmentID);

    List<UserAssessmentDto> getAssessmentsByStudent(Student student);

    List<UserAssessmentDto> getAssessmentsByTopic(Topic topic);

    List<UserAssessmentDto> getAssessmentsBySubject(Subject subject);

    List<UserAssessmentDto> getAssessmentsByStudentAndTopic(Student student, Topic topic);

    List<UserAssessmentDto> getAssessmentsByStudentAndSubject(Student student, Subject subject);

    UserAssessmentDto updateAssessment(Long assessmentID, UserAssessmentDto dto);

    void deleteAssessment(Long assessmentID);
}
