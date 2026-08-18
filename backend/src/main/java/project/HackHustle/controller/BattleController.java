package project.HackHustle.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.HackHustle.battle.BattleRoom;
import project.HackHustle.service.BattleManagerService;
import project.HackHustle.service.StudentService;

@RestController
@RequestMapping("/api/battle")
@RequiredArgsConstructor
public class BattleController {

    private final BattleManagerService battleManagerService;
    private final StudentService studentService;
    /**
     * CREATE BATTLE
     * Host creates battle and becomes first player
     */
    @PostMapping("/create/{studentEmail}")
    public ResponseEntity<String> createBattle(@PathVariable String  studentEmail) {
        String battleCode = battleManagerService.createBattle(studentService.getStudentById(studentEmail).getStudentId());
        
        return ResponseEntity.ok(battleCode);
    }

    /**
     * JOIN BATTLE
     * Student joins using battle code
     */
    @PostMapping("/join/{code}/{studentEmail}")
    public ResponseEntity<BattleRoom> joinBattle(@PathVariable String code,
                                                 @PathVariable String studentEmail) {
        BattleRoom room = battleManagerService.joinBattle(code, studentService.getStudentById(studentEmail).getStudentId());

        return ResponseEntity.ok(room);
    }

    /**
     * START BATTLE
     * Only host can start
     */
    @PostMapping("/start/{code}/{studentEmail}")
    public ResponseEntity<String> startBattle(@PathVariable String code,
                                              @PathVariable String studentEmail) {
        battleManagerService.startBattle(code, studentService.getStudentById(studentEmail).getStudentId());
        return ResponseEntity.ok("Battle Started Successfully");
    }

    /**
     * GET BATTLE ROOM
     * Useful for frontend refresh or polling
     */
    @GetMapping("/{code}")
    public ResponseEntity<BattleRoom> getBattleRoom(@PathVariable String code) {
        BattleRoom room = battleManagerService.getRoom(code);
        return ResponseEntity.ok(room);
    }
}