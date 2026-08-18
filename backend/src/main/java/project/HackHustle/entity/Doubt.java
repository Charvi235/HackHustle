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
@Table(name = "doubt")
public class Doubt
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doubt_id", nullable = false)
    private Long doubtID;

    @Column(name = "doubt_status", nullable = false)
    private String  doubtStatus = "Pending";

    @Column(name = "date", nullable = false)
    @CreationTimestamp
    private LocalDateTime date;

    @Column(name = "query_asked", nullable = false, length = 2000)
    private String queryAsked;

    @Column(name = "answer_provided", length = 2000)
    private String answerProvided;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;

    @Column(name = "selected_subject", nullable = false)
    private String selectedSubject;

    @PrePersist
    public void prePersist()
    {
        if (doubtStatus == null)
            doubtStatus = "Pending";

        if(answerProvided == null)
            answerProvided = "None";
    }

}
