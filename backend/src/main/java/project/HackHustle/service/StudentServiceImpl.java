package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.StudentDto;
import project.HackHustle.entity.Student;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.mapper.StudentMapper;
import project.HackHustle.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService
{
    private StudentRepository studentRepository;

    @Override
    public StudentDto createStudent(StudentDto studentDto)
    {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(String studentId)
    {
        Student student = studentRepository.findByEmailId(studentId).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents()
    {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(StudentMapper::mapToStudentDto).collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent)
    {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("Student does not exist with given id " + studentId));
        student.setFirstName(updatedStudent.getFirstName());
        student.setLastName(updatedStudent.getLastName());
        student.setEmailId(updatedStudent.getEmailId());
        student.setPassword(updatedStudent.getPassword());
        student.setPoints(updatedStudent.getPoints());
        student.setQuizAttempted(updatedStudent.getQuizAttempted());

        Student savedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public void deleteStudent(Long studentId)
    {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("Student does not exist with given id " + studentId));

        studentRepository.deleteById(studentId);
    }

    @Override
    public StudentDto loginStudent(String email, String password) {
        // Check if email exists
        Student student = studentRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

        // Check password match
        if (!student.getPassword().equals(password)) {
            throw new IllegalArgumentException("Incorrect password");
        }
        return StudentMapper.mapToStudentDto(student);  // Successful login
    }
    @Override
    public void updatePassword(String email, String newPassword) {

        Student student = studentRepository.findByEmailId(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

        student.setPassword(newPassword);   // no encoding
        studentRepository.save(student);
    }


    @Override
    public StudentDto getStudentByEmail(String email) {

        Student student = studentRepository.findByEmailId(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return StudentMapper.mapToStudentDto(student); // use your existing mapper method
    }

    @Override
    public StudentDto updateStudentPoints(Long studentId, Long points, Long quizAttempted) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new ResourceNotFoundException("Student does not exist with given id " + studentId));

        // Update the specific fields
        student.setPoints(points);
        student.setQuizAttempted(quizAttempted);

        Student updatedStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudent);
    }
}
