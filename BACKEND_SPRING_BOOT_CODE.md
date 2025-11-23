# Spring Boot Backend Code - Complete Updated Version

## 1. Login Request DTO
```java
package com.hackhustle.dto;

public class LoginRequest {
    private String email;
    private String password;
    private String role; // "STUDENT" or "FACULTY"

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
```

## 2. Signup Request DTO
```java
package com.hackhustle.dto;

public class SignupRequest {
    private String first_name;
    private String last_name;
    private String email;
    private String password;

    // Getters and Setters
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
```

## 3. Auth Response DTO
```java
package com.hackhustle.dto;

public class AuthResponse {
    private String token;
    private String student_id;
    private String faculty_id;
    private String first_name;
    private String last_name;
    private String email;
    private Integer points;
    private String role; // "STUDENT" or "FACULTY"
    private String subject;
    private Double rating;

    // Constructor
    public AuthResponse() {}

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getStudent_id() { return student_id; }
    public void setStudent_id(String student_id) { this.student_id = student_id; }
    
    public String getFaculty_id() { return faculty_id; }
    public void setFaculty_id(String faculty_id) { this.faculty_id = faculty_id; }
    
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
```

## 4. Auth Controller
```java
package com.hackhustle.controller;

import com.hackhustle.dto.AuthResponse;
import com.hackhustle.dto.LoginRequest;
import com.hackhustle.dto.SignupRequest;
import com.hackhustle.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest signupRequest) {
        try {
            AuthResponse response = authService.signup(signupRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String token) {
        // Handle logout logic if needed
        return ResponseEntity.ok().build();
    }
}
```

## 5. CORS Configuration
```java
package com.hackhustle.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173") // Your React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

## 6. Student Entity (Example)
```java
package com.hackhustle.entity;

import javax.persistence.*;

@Entity
@Table(name = "students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "student_id", unique = true)
    private String student_id;
    
    @Column(name = "first_name")
    private String first_name;
    
    @Column(name = "last_name")
    private String last_name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    private Integer points = 0;
    
    @Column(name = "role")
    private String role = "STUDENT";
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getStudent_id() { return student_id; }
    public void setStudent_id(String student_id) { this.student_id = student_id; }
    
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
```

## 7. Faculty Entity (Example)
```java
package com.hackhustle.entity;

import javax.persistence.*;

@Entity
@Table(name = "faculty")
public class Faculty {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "faculty_id", unique = true)
    private String faculty_id;
    
    @Column(name = "first_name")
    private String first_name;
    
    @Column(name = "last_name")
    private String last_name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    private String subject;
    
    private Double rating = 0.0;
    
    @Column(name = "role")
    private String role = "FACULTY";
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFaculty_id() { return faculty_id; }
    public void setFaculty_id(String faculty_id) { this.faculty_id = faculty_id; }
    
    public String getFirst_name() { return first_name; }
    public void setFirst_name(String first_name) { this.first_name = first_name; }
    
    public String getLast_name() { return last_name; }
    public void setLast_name(String last_name) { this.last_name = last_name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
```

## Important Notes:

1. **Field Naming**: All fields use **snake_case** to match database conventions and frontend expectations
2. **Role Values**: Use uppercase "STUDENT" or "FACULTY" in the backend
3. **CORS**: Configure CORS to allow requests from `http://localhost:5173`
4. **JWT Token**: Generate and return JWT token in login/signup responses
5. **Password Hashing**: Use BCrypt for password hashing (not shown in examples for brevity)

## Database Schema (MySQL):

```sql
CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT DEFAULT 0,
    role VARCHAR(50) DEFAULT 'STUDENT'
);

CREATE TABLE faculty (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    faculty_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    rating DOUBLE DEFAULT 0.0,
    role VARCHAR(50) DEFAULT 'FACULTY'
);
```

## Testing the API:

### Login Request:
```json
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

### Signup Request:
```json
POST http://localhost:8080/api/auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Expected Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student_id": "STU001",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "points": 0,
  "role": "STUDENT"
}
```
