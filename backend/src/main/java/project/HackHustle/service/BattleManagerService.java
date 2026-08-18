

package project.HackHustle.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import project.HackHustle.battle.BattleRoom;
import project.HackHustle.battle.BattleStatus;
import project.HackHustle.entity.QuizBattle;
import project.HackHustle.entity.Student;
import project.HackHustle.repository.QuizBattleRepository;
import project.HackHustle.repository.StudentRepository;
import project.HackHustle.socket.SocketMessage;
import project.HackHustle.dto.QuestionDto;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Transactional
@RequiredArgsConstructor
public class BattleManagerService {

    private final SimpMessagingTemplate messagingTemplate;
    private final QuestionService questionService; //Injected to fetch  DB questions
    private final Map<String, BattleRoom> activeBattles = new ConcurrentHashMap<>();
    private final QuizBattleRepository quizBattleRepository; // Inject this
    private final StudentRepository studentRepository;
    private final StudentService studentService;
    /* ================= CREATE ================= */
    public String createBattle(Long hostId) {
        String code = generateCode();
        BattleRoom room = new BattleRoom();
        room.setBattleCode(code);
        room.setHostId(hostId);

        // 🔥 Fetch 10 random questions using your working getQuestionForQuiz() logic
        room.setQuestions(questionService.getQuestionForQuiz());

        room.getPlayers().add(hostId);
        room.getScores().put(hostId, 0);
        room.setStatus(BattleStatus.WAITING);

        activeBattles.put(code, room);
        return code;
    }

    /* ================= JOIN (REST) ================= */
    public BattleRoom joinBattle(String code, Long studentId) {
        BattleRoom room = activeBattles.get(code);
        if (room == null) throw new RuntimeException("Invalid Battle Code");
        if (room.getStatus() != BattleStatus.WAITING) throw new RuntimeException("Battle Already Started");

        if (!room.getPlayers().contains(studentId)) {
            room.getPlayers().add(studentId);
            room.getScores().put(studentId, 0);
        }
        return room;
    }

    /* ================= JOIN (SOCKET) ================= */
    public void handleJoin(SocketMessage message) {
        BattleRoom room = activeBattles.get(message.getCode());
        if (room == null) return;

        // 🔥 Broadcast the FULL room object so everyone (Host + Joined player) sees the updated state
        messagingTemplate.convertAndSend("/topic/battle/" + message.getCode(), room);
    }

    /* ================= START ================= */
    public void startBattle(String code, Long studentId) {
        BattleRoom room = activeBattles.get(code);
        if (room == null) throw new RuntimeException("Battle Not Found");
        if (!room.getHostId().equals(studentId)) throw new RuntimeException("Only Host Can Start");

        room.setStatus(BattleStatus.LIVE);

        // 🔥 Send "START" string to trigger everyone's screen change to 'game' mode
        messagingTemplate.convertAndSend("/topic/battle/" + code, "START");
    }

    /* ================= ANSWER (SOCKET) ================= */

    public void handleAnswer(SocketMessage message) {
        BattleRoom room = activeBattles.get(message.getCode());
        if (room == null || room.getStatus() != BattleStatus.LIVE) return;

        //  LOG 1: Check  message
        System.out.println("📩 Received Answer: " + message.getAnswer() + " from " + message.getStudentEmail());

        Long actualStudentId = studentService.getStudentById(message.getStudentEmail()).getStudentId();
        int currentIndex = room.getCurrentQuestionIndex();

        if (currentIndex >= room.getQuestions().size()) return;

        QuestionDto currentQuestion = room.getQuestions().get(currentIndex);

        // LOG 2: Check  answer
        System.out.println("❓ Target Answer: " + currentQuestion.getCorrectAnswer());

        boolean isCorrect = currentQuestion.getCorrectAnswer().trim().equalsIgnoreCase(message.getAnswer().trim());

        if (isCorrect) {

            System.out.println("✅ CORRECT! Adding 10 points to ID: " + actualStudentId);
            room.getScores().merge(actualStudentId, 10, Integer::sum);
        } else {
            System.out.println("❌ WRONG ANSWER!");
        }

        // Index update
        room.setCurrentQuestionIndex(currentIndex + 1);

        // Broadcast
        messagingTemplate.convertAndSend("/topic/battle/" + message.getCode(), room);
    }
    public BattleRoom getRoom(String code) {
        return activeBattles.get(code);
    }

    private String generateCode() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
