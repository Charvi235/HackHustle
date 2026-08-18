package project.HackHustle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "quiz_battle")
public class QuizBattle
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id", nullable = false)
    private Long quizID;

    @Column(name = "quiz_number", nullable = false)
    private Integer quizNumber;

    @Column(name = "player_number", nullable = false)
    private Integer playerNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "quiz_score", nullable = false)
    private Long quizScore;

    @Column(name = "quiz_status", nullable = false)
    private String status;

    @Transient
    public String getBattleCode() {
        return quizNumber + "_" + playerNumber;
    }


}
