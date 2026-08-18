package project.HackHustle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "interview_result")
public class InterviewResult
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_result_id", nullable = false)
    private Long interviewResultID;

    @Column(name = "question_1", nullable = false)
    private String question_1;

    @Column(name = "provided_answer_1", nullable = false)
    private String providedAns_1;

    @Column(name = "better_answer_1", nullable = false)
    private String betterAns_1;

    @Column(name = "question_2", nullable = false)
    private String question_2;

    @Column(name = "provided_answer_2", nullable = false)
    private String providedAns_2;

    @Column(name = "better_answer_2", nullable = false)
    private String betterAns_2;

    @Column(name = "question_3", nullable = false)
    private String question_3;

    @Column(name = "provided_answer_3", nullable = false)
    private String providedAns_3;

    @Column(name = "better_answer_3", nullable = false)
    private String betterAns_3;

    @Column(name = "interview_score", nullable = false)
    private Long interviewScore;

    @OneToOne
    @JoinColumn(name = "interview_id", nullable = false)
    private Interview interview;
}
