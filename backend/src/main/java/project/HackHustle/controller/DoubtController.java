package project.HackHustle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.dto.DoubtDto;
import project.HackHustle.service.DoubtService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/doubts")
public class DoubtController
{

      private DoubtService doubtService;

      //http://localhost:8080/api/doubts
      @PostMapping
        public ResponseEntity<DoubtDto> createDoubt(@RequestBody  DoubtDto doubtDto)
      {
//          DoubtDto savedDoubt = doubtService.saveDoubt(doubtDto);
//          return new ResponseEntity<>(savedDoubt, HttpStatus.CREATED);
          DoubtDto savedDoubt = doubtService.createDoubt(doubtDto);
          return new ResponseEntity<>(savedDoubt, HttpStatus.CREATED);
      }

      //http://localhost:8080/api/doubts/update
      @PutMapping("/update")
       public ResponseEntity<DoubtDto> updateDoubt( @RequestBody DoubtDto  doubtDto)
        {
           DoubtDto updateDoubt = doubtService.updateDoubt(doubtDto);
           return new ResponseEntity<>(updateDoubt,HttpStatus.ACCEPTED);
        }

        //http://localhost:8080/api/doubts/teacher/1001
        @GetMapping("/teacher/{id}")
         public ResponseEntity<?> teacherDoubtList(@PathVariable("id") Long teacherID)
        {
            List<DoubtDto> list = doubtService.teacherDoubtList(teacherID);
            if (list.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No doubts found for teacher ID " + teacherID);
            }
            return ResponseEntity.ok(list);
        }

        //http://localhost:8080/api/doubts/student/1001
        @GetMapping("/student/{id}")
        public ResponseEntity<?> studentDoubtList(@PathVariable("id") Long studentId)
        {
            List<DoubtDto> list = doubtService.studentDoubtList(studentId);
            if (list.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No doubts found for student ID " + studentId);
            }
            return ResponseEntity.ok(list);
        }

        //http://localhost:8080/api/doubts/1001
        @DeleteMapping("{id}")
        public ResponseEntity<String> deleteDoubt(@PathVariable("id") Long doubtID)
        {
            doubtService.deleteDoubt(doubtID);
            return ResponseEntity.ok("Doubt with ID " + doubtID + " deleted successfully");
        }

    // http://localhost:8080/api/doubts/teacher/{id}/resolved
    @GetMapping("/teacher/{id}/resolved")
    public ResponseEntity<List<DoubtDto>> getResolvedDoubts(@PathVariable("id") Long teacherID) {
        List<DoubtDto> list = doubtService.teacherResolvedDoubtList(teacherID);
        return ResponseEntity.ok(list);
    }

}
