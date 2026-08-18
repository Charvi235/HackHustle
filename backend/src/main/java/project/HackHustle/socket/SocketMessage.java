

package project.HackHustle.socket;

import lombok.Data;

@Data
public class SocketMessage {

    private String code;       // battle code
    private String StudentEmail;
    private String answer;     // used when answering
}
