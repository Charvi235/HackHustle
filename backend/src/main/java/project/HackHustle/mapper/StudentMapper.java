package project.HackHustle.mapper;

import project.HackHustle.dto.StudentDto;
import project.HackHustle.entity.Student;

public class StudentMapper
{
    public static StudentDto mapToStudentDto(Student student)
    {
        return new StudentDto(
                student.getStudentId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmailId(),
                student.getPassword(),
                student.getPoints(),
                student.getQuizAttempted()
        );
    }


    public static Student mapToStudent(StudentDto studentDto)
    {
        return new Student(
                studentDto.getStudentId(),
                studentDto.getFirstName(),
                studentDto.getLastName(),
                studentDto.getEmailId(),
                studentDto.getPassword(),
                studentDto.getPoints(),
                studentDto.getQuizAttempted()
        );
    }
}
