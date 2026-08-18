package project.HackHustle.mapper;

import project.HackHustle.dto.DoubtDto;
import project.HackHustle.entity.Doubt;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Teacher;

public class DoubtMapper {

    public static DoubtDto mapToDoubtDto(Doubt doubt)
    {
        return new DoubtDto(
                doubt.getDoubtID(),
                doubt.getDoubtStatus(),
                doubt.getDate(),
                doubt.getQueryAsked(),
                doubt.getAnswerProvided(),
                doubt.getStudent().getStudentId(),
                doubt.getTeacher().getTeacherID(),
                doubt.getSelectedSubject()
        );
    }

    public static Doubt mapToDoubt(DoubtDto doubtDto)
    {
        Doubt doubt = new Doubt();

        doubt.setDoubtID(doubtDto.getDoubtID());
        doubt.setDoubtStatus(doubtDto.getDoubtStatus());
        doubt.setDate(doubtDto.getDate());
        doubt.setQueryAsked(doubtDto.getQueryAsked());
        doubt.setAnswerProvided(doubtDto.getAnswerProvided());
        doubt.setSelectedSubject(doubtDto.getSelectedSubject());

        // Creating objects for foreign keys
        if (doubtDto.getStudentId() != null) {
            Student student = new Student();
            student.setStudentId(doubtDto.getStudentId());
            doubt.setStudent(student);
        }

        if (doubtDto.getTeacherID() != null) {
            Teacher teacher = new Teacher();
            teacher.setTeacherID(doubtDto.getTeacherID());
            doubt.setTeacher(teacher);
        }

        return doubt;
    }
}
