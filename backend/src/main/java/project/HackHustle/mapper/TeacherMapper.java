package project.HackHustle.mapper;

import project.HackHustle.dto.TeacherDto;
import project.HackHustle.entity.Teacher;

public class TeacherMapper
{
    public static TeacherDto mapToTeacherDto(Teacher teacher)
    {
        return new TeacherDto(
                teacher.getTeacherID(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getEmailId(),
                teacher.getPassword(),
                teacher.getRating(),
                teacher.getSubjectAssociated(),
                teacher.getInstitute(),
                teacher.getDepartment(),
                teacher.getDesignation(),
                teacher.getExperience(),
                teacher.getNumberOfRatings()
        );
    }

    public static Teacher mapToTeacher(TeacherDto teacherDto)
    {
        return new Teacher(
                teacherDto.getTeacherId(),
                teacherDto.getFirstName(),
                teacherDto.getLastName(),
                teacherDto.getEmailId(),
                teacherDto.getPassword(),
                teacherDto.getRating(),
                teacherDto.getSubjectAssociated(),
                teacherDto.getInstitute(),
                teacherDto.getDepartment(),
                teacherDto.getDesignation(),
                teacherDto.getExperience(),
                teacherDto.getNumberOfRatings()
        );
    }
}
