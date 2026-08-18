package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.LoginDto;
import project.HackHustle.dto.StudentDto;
import project.HackHustle.exception.ResourceNotFoundException;
import project.HackHustle.service.StudentService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/students")
public class StudentController
{
    private StudentService studentService;

    //http://localhost:8080/api/students
    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto)
    {
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    //http://localhost:8080/api/students/
    @GetMapping("{emailId}")
    public ResponseEntity<StudentDto> getStudentById(@PathVariable("emailId") String studentId)
    {
        StudentDto studentDto = studentService.getStudentById(studentId);
        return new ResponseEntity<>(studentDto, HttpStatus.OK);
    }


    //http://localhost:8080/api/students
    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents()
    {
        List<StudentDto> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }


    //http://localhost:8080/api/students/1001
    @PutMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") Long studentId, @RequestBody StudentDto updatedStudent)
    {
        StudentDto studentDto = studentService.updateStudent(studentId,updatedStudent);
        return ResponseEntity.ok(studentDto);
    }


    //http://localhost:8080/api/students/1004
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId)
    {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Student deleted successfully");
    }


    //http://localhost:8080/api/students/login
    @PostMapping("/login")
    public ResponseEntity<StudentDto> loginStudent(@RequestBody LoginDto loginDto)
    {
        try
        {
            StudentDto student = studentService.loginStudent(
                    loginDto.getEmailId(),
                    loginDto.getPassword()
            );
            return ResponseEntity.ok(student);         //200 OK -> success
        }
        catch (ResourceNotFoundException ex)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();     //404 Not Found
        }
        catch (IllegalArgumentException ex)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();      //401 Unauthorized -> wrong password
        }
    }
    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String newPassword = request.get("newPassword");

        studentService.updatePassword(email, newPassword);

        return ResponseEntity.ok("Password updated successfully");
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<StudentDto> getStudentByEmail(@PathVariable String email) {
        StudentDto studentDto = studentService.getStudentByEmail(email);
        return ResponseEntity.ok(studentDto);
    }

    //http://localhost:8080/api/students/${studentId}/update-points
    @PatchMapping("/{id}/update-points")
    public ResponseEntity<StudentDto> updateStudentPoints(
            @PathVariable("id") Long studentId,
            @RequestBody Map<String, Long> updates) {

        Long points = updates.get("points");
        Long quizAttempted = updates.get("quizAttempted");

        StudentDto updatedStudent = studentService.updateStudentPoints(studentId, points, quizAttempted);
        return ResponseEntity.ok(updatedStudent);
    }

}

