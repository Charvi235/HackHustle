package project.HackHustle.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id", nullable = false)
    private Long subjectID;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "total_questions", nullable = false)
    private Long totalQuestions;

    // One Subject can have multiple Topics
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Topic> topics;
}

