package project.HackHustle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.HackHustle.dto.DoubtDto;
import project.HackHustle.entity.Doubt;
import project.HackHustle.entity.Student;
import project.HackHustle.entity.Teacher;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.mapper.DoubtMapper;
import project.HackHustle.repository.DoubtRepository;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.repository.TeacherRepository;

import java.util.List;

@Service
@AllArgsConstructor

public class DoubtServiceImpl implements DoubtService {

    private DoubtRepository doubtRepository;
    private TeacherRepository teacherRepository;
    private StudentRepository studentRepository;

    @Override
    public DoubtDto saveDoubt(DoubtDto doubtDto)
    {
        Doubt doubt = DoubtMapper.mapToDoubt(doubtDto);
        Doubt savedDoubt = doubtRepository.save(doubt);

        return DoubtMapper.mapToDoubtDto(savedDoubt);
    }


    @Override
    public DoubtDto updateDoubt(DoubtDto doubtDto) {
        Doubt doubt = doubtRepository.findById(doubtDto.getDoubtID()).orElseThrow(
                () -> new ResourceNotFoundException("Doubt does not exist with given id " + doubtDto.getDoubtID()));

        doubt.setAnswerProvided(doubtDto.getAnswerProvided());

        // LOGIC: If an answer is provided, set status to Resolved
        if (doubtDto.getAnswerProvided() != null && !doubtDto.getAnswerProvided().isEmpty()) {
            doubt.setDoubtStatus("Resolved");
        } else {
            doubt.setDoubtStatus(doubtDto.getDoubtStatus());
        }

        doubtRepository.save(doubt);
        return DoubtMapper.mapToDoubtDto(doubt);
    }


    @Override
    public void deleteDoubt(Long doubtID)
    {
        Doubt doubt = doubtRepository.findById(doubtID)
                .orElseThrow(() -> new ResourceNotFoundException("Doubt not found with ID: " + doubtID));

        doubtRepository.delete(doubt);
    }

    @Override
    public List<DoubtDto> teacherDoubtList(Long teacherID)
    {
        List<Doubt> teacherList =
                doubtRepository.findByTeacher_TeacherIDAndDoubtStatus(teacherID, "Pending");


        return teacherList.stream().map(DoubtMapper::mapToDoubtDto).toList();
    }

    @Override
    public List<DoubtDto> studentDoubtList(Long studentId)
    {
        List<Doubt> studentList = doubtRepository.findByStudent_StudentId(studentId);

        if (studentList.isEmpty())
        {
            throw new ResourceNotFoundException("No doubts found for student ID: " + studentId);
        }
        return studentList.stream().map(DoubtMapper::mapToDoubtDto).toList();
    }



    @Override
    public DoubtDto createDoubt(DoubtDto doubtDto) {
        // 1. Fetch the specific teacher selected by the student
        Teacher selectedTeacher = teacherRepository.findById(doubtDto.getTeacherID())
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found with ID: " + doubtDto.getTeacherID()));

        // 2. Fetch the student (Crucial: Hibernate will fail if student is null)
        Student student = studentRepository.findById(doubtDto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + doubtDto.getStudentId()));

        // 3. Create and populate the doubt entity
        Doubt doubt = new Doubt();

        // IMPORTANT: Mapping the missing fields that caused your 500 error
        doubt.setQueryAsked(doubtDto.getQueryAsked());
        doubt.setStudent(student);
        doubt.setTeacher(selectedTeacher);
        doubt.setSelectedSubject(doubtDto.getSelectedSubject());

        // Status and Date handling
        doubt.setDoubtStatus("Pending"); // Ensuring consistency
        // Note: 'date' is handled by @CreationTimestamp in your Entity, so no need to set it manually.

        // 4. Save to Database
        Doubt saved = doubtRepository.save(doubt);

        // 5. Return mapped DTO
        return DoubtMapper.mapToDoubtDto(saved);
    }

    @Override
    public List<DoubtDto> teacherResolvedDoubtList(Long teacherID) {
        List<Doubt> resolvedList =
                doubtRepository.findByTeacher_TeacherIDAndDoubtStatus(teacherID, "Resolved");
        return resolvedList.stream().map(DoubtMapper::mapToDoubtDto).toList();
    }

}


