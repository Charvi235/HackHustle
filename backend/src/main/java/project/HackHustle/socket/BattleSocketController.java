package project.HackHustle.socket;



import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import project.HackHustle.battle.BattleManager;
import project.HackHustle.service.BattleManagerService;

@Controller
@RequiredArgsConstructor
public class BattleSocketController {

    private final BattleManagerService battleManagerService;

    @MessageMapping("/join")
    public void joinBattle(@Payload SocketMessage message) {
        battleManagerService.handleJoin(message);
    }

    @MessageMapping("/answer")
    public void answer(@Payload SocketMessage message) {
        battleManagerService.handleAnswer(message);
    }
}

