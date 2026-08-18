package project.HackHustle.battle;

import project.HackHustle.dto.QuestionDto;
import java.util.*;

public class BattleRoom {

    private String battleCode;
    private Long hostId;
    private Set<Long> players = new HashSet<>();
    private Map<Long, Integer> scores = new HashMap<>();
    private BattleStatus status = BattleStatus.WAITING;
    private int currentQuestionIndex = 0;

    // 🔥 New field to store the 10 random questions from DB for this battle
    private List<QuestionDto> questions = new ArrayList<>();

    // GETTERS & SETTERS
    public String getBattleCode() { return battleCode; }
    public void setBattleCode(String battleCode) { this.battleCode = battleCode; }

    public Long getHostId() { return hostId; }
    public void setHostId(Long hostId) { this.hostId = hostId; }

    public Set<Long> getPlayers() { return players; }
    public void setPlayers(Set<Long> players) { this.players = players; }

    public Map<Long, Integer> getScores() { return scores; }
    public void setScores(Map<Long, Integer> scores) { this.scores = scores; }

    public BattleStatus getStatus() { return status; }
    public void setStatus(BattleStatus status) { this.status = status; }

    public int getCurrentQuestionIndex() { return currentQuestionIndex; }
    public void setCurrentQuestionIndex(int currentQuestionIndex) { this.currentQuestionIndex = currentQuestionIndex; }

    public List<QuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuestionDto> questions) { this.questions = questions; }
}
