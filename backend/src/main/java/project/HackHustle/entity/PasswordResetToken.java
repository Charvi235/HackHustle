package project.HackHustle.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken
{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, unique = true)
        private String token;

        @Column(nullable = false)
        private String email;

        @Column(nullable = false)
        private LocalDateTime expiryTime;

        @Column(nullable = false)
        private boolean used;
}
