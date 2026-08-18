package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class QuestionStatusDto implements Serializable  {

    private Long questionID;
    private String emailId;

}
