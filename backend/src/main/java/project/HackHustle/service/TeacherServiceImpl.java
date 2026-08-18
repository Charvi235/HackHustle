package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.TeacherDto;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Teacher;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.mapper.TeacherMapper;
import project.HackHustle.repository.TeacherRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TeacherServiceImpl implements TeacherService
{
    private TeacherRepository teacherRepository;

    @Override
    public TeacherDto createTeacher(TeacherDto teacherDto)
    {
        Teacher teacher = TeacherMapper.mapToTeacher(teacherDto);
        Teacher savedTeacher = teacherRepository.save(teacher);
        return TeacherMapper.mapToTeacherDto(savedTeacher);
    }

    @Override
    public TeacherDto getTeacherById(Long teacherId)
    {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
        return TeacherMapper.mapToTeacherDto(teacher);
    }

    @Override
    public List<TeacherDto> getAllTeachers()
    {
        List<Teacher> teachers = teacherRepository.findAll();
        return teachers.stream().map(TeacherMapper::mapToTeacherDto).collect(Collectors.toList());
    }


    @Override
    public TeacherDto updateTeacher(Long teacherId, TeacherDto updatedTeacher)
    {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(
                () -> new ResourceNotFoundException("Teacher does not exist with given id " + teacherId));

        teacher.setFirstName(updatedTeacher.getFirstName());
        teacher.setLastName(updatedTeacher.getLastName());
        teacher.setEmailId(updatedTeacher.getEmailId());
        teacher.setPassword(updatedTeacher.getPassword());
        teacher.setRating(updatedTeacher.getRating());
        teacher.setSubjectAssociated(updatedTeacher.getSubjectAssociated());
        teacher.setInstitute(updatedTeacher.getInstitute());
        teacher.setDepartment(updatedTeacher.getDepartment());
        teacher.setDesignation(updatedTeacher.getDesignation());
        teacher.setExperience(updatedTeacher.getExperience());


        Teacher savedTeacher = teacherRepository.save(teacher);
        return TeacherMapper.mapToTeacherDto(savedTeacher);
    }

    @Override
    public void deleteTeacher(Long teacherId)
    {
        Teacher teacher = teacherRepository.findById(teacherId).orElseThrow(
                () -> new ResourceNotFoundException("Teacher does not exist with given id " + teacherId));

        teacherRepository.deleteById(teacherId);
    }

    @Override
    public void loginTeacher(String email, String password)
    {
        // Check if email exists
        Teacher teacher = teacherRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with email: " + email));

        // Check password match
        if (!teacher.getPassword().equals(password)) {
            throw new IllegalArgumentException("Incorrect password");
        }

        // Successful login — do nothing, just return
    }

    @Override
    public TeacherDto getTeacherByEmail(String email) {
        Teacher teacher = teacherRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with email: " + email));

        return TeacherMapper.mapToTeacherDto(teacher);
    }
    @Override
    public void updatePassword(String email, String newPassword) {

        Teacher teacher = teacherRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

        teacher.setPassword(newPassword);   // no encoding
       teacherRepository.save(teacher);
    }


    @Override
    public void rateTeacher(Long teacherId, Long newRatingValue) {
        // 1. Fetch current data from DB
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        // 2. Get existing values (handle nulls just in case)
        double currentAvg = (teacher.getRating() != null) ? teacher.getRating() : 0.0;
        int currentCount = (teacher.getNumberOfRatings() != null) ? teacher.getNumberOfRatings() : 0;

        // 3. The Math: (OldTotal + NewValue) / NewCount
        double newAverage = ((currentAvg * currentCount) + newRatingValue) / (currentCount + 1);

        // 4. Update the object
        teacher.setRating(newAverage);
        teacher.setNumberOfRatings(currentCount + 1); // Maintenance happens here!

        // 5. Save back to DB
        teacherRepository.save(teacher);
    }


    @Override
    public List<TeacherDto> getTeacherBySubject(String subjectAssociated) {
        // 1. Fetch the list from the repository
        List<Teacher> teachers = teacherRepository.findBySubjectAssociated(subjectAssociated);

        // 2. Check if the list is empty and handle it
        if (teachers.isEmpty()) {
            throw new ResourceNotFoundException("No teachers found handling the subject: " + subjectAssociated);
        }

        // 3. Map the list of entities to a list of DTOs
        return teachers.stream()
                .map(TeacherMapper::mapToTeacherDto)
                .collect(Collectors.toList());
    }

}
