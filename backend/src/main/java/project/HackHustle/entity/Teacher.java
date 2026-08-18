package project.HackHustle.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "teacher")

public class Teacher
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id", nullable = false)
    private Long teacherID;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email_id", nullable = false, unique = true)
    private String emailId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "rating", nullable = false)
    private Double rating = 0.0;

    @Column(name = "subject_associated", nullable = false)
    private String subjectAssociated;   //a teacher handles only one subject

    @Column(name = "institute", nullable = false)
    private String institute;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "designation", nullable = false)
    private String designation;

    @Column(name = "experience", nullable = false)
    private String experience;

    @Column(name = "number_of_ratings")
    private Integer numberOfRatings = 0;

//hello testing
    @PrePersist
    public void prePersist()
    {
        if (rating == null) rating = 0.0;
        if(designation == null) designation = "N/A";
        if(department == null) department = "N/A";
        if(experience == null) experience = "N/A";
        if (numberOfRatings == null) numberOfRatings = 0;
    }
}
