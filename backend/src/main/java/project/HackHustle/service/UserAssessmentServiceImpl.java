package project.HackHustle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.HackHustle.dto.UserAssessmentDto;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Subject;
import project.HackHustle.entity.Topic;
import project.HackHustle.entity.UserAssessment;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.mapper.UserAssessmentMapper;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.repository.TopicRepository;
import project.HackHustle.repository.UserAssessmentRepository;
import project.HackHustle.repository.SubjectRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserAssessmentServiceImpl implements UserAssessmentService {

    private final UserAssessmentRepository userAssessmentRepository;
    private final StudentRepository studentRepository;
    private final TopicRepository topicRepository;
    private final SubjectRepository subjectRepository;

@Override
public UserAssessmentDto createAssessment(UserAssessmentDto dto) {

    Student student = studentRepository.findByEmailId(dto.getEmailId())
            .orElseThrow(() -> new ResourceNotFoundException(
                    "Student not found with email Id " + dto.getEmailId()));

    Subject subject = subjectRepository.findById(dto.getSubjectID())
            .orElseThrow(() -> new ResourceNotFoundException(
                    "Subject not found with ID " + dto.getSubjectID()));

    Topic topic = null;

    // Only fetch topic if it is NOT null
    if (dto.getTopicID() != null) {
        topic = topicRepository.findById(dto.getTopicID())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Topic not found with ID " + dto.getTopicID()));
    }

    UserAssessment assessment = new UserAssessment();
    assessment.setStudent(student);
    assessment.setSubject(subject);
    assessment.setTopic(topic);   // will be null for subject-wise
    assessment.setAssessmentScore(dto.getAssessmentScore());

    UserAssessment saved = userAssessmentRepository.save(assessment);

    return UserAssessmentMapper.mapToUserAssessmentDto(saved);
}


    @Override
    public List<UserAssessmentDto> getAllAssessments() {
        return userAssessmentRepository.findAll().stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserAssessmentDto getAssessmentById(Long assessmentID) {
        UserAssessment assessment = userAssessmentRepository.findById(assessmentID)
                .orElseThrow(() -> new ResourceNotFoundException("UserAssessment not found with ID " + assessmentID));
        return UserAssessmentMapper.mapToUserAssessmentDto(assessment);
    }

    @Override
    public List<UserAssessmentDto> getAssessmentsByStudent(Student student) {
        return userAssessmentRepository.findByStudent(student)
                .stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAssessmentDto> getAssessmentsByTopic(Topic topic) {
        return userAssessmentRepository.findByTopic(topic)
                .stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAssessmentDto> getAssessmentsBySubject(Subject subject) {
        return userAssessmentRepository.findBySubject(subject)
                .stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAssessmentDto> getAssessmentsByStudentAndTopic(Student student, Topic topic) {
        return userAssessmentRepository.findByStudentAndTopic(student, topic)
                .stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAssessmentDto> getAssessmentsByStudentAndSubject(Student student, Subject subject) {
        return userAssessmentRepository.findByStudentAndSubject(student, subject)
                .stream()
                .map(UserAssessmentMapper::mapToUserAssessmentDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserAssessmentDto updateAssessment(Long assessmentID, UserAssessmentDto dto) {
        UserAssessment existing = userAssessmentRepository.findById(assessmentID)
                .orElseThrow(() -> new ResourceNotFoundException("UserAssessment not found with ID " + assessmentID));

        // Update score
        existing.setAssessmentScore(dto.getAssessmentScore());

        // Update date automatically to now
        existing.setDate(LocalDateTime.now());

        // Optional: update topic if provided
        if (dto.getTopicID() != null) {
            Topic topic = topicRepository.findById(dto.getTopicID())
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found with ID " + dto.getTopicID()));
            existing.setTopic(topic);
        }

        // Optional: update subject if provided
        if (dto.getSubjectID() != null) {
            Subject subject = subjectRepository.findById(dto.getSubjectID())
                    .orElseThrow(() -> new ResourceNotFoundException("Subject not found with ID " + dto.getSubjectID()));
            existing.setSubject(subject);
        }

        UserAssessment updated = userAssessmentRepository.save(existing);
        return UserAssessmentMapper.mapToUserAssessmentDto(updated);
    }



    @Override
    public void deleteAssessment(Long assessmentID) {
        UserAssessment existing = userAssessmentRepository.findById(assessmentID)
                .orElseThrow(() -> new ResourceNotFoundException("UserAssessment not found with ID " + assessmentID));
        userAssessmentRepository.delete(existing);
    }
}
