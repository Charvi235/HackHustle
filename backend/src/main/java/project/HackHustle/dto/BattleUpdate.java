package project.HackHustle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import project.HackHustle.battle.BattleRoom;

// project.HackHustle.socket.BattleUpdate.java
@Data
@AllArgsConstructor
public class BattleUpdate {
    private String type; // JOIN, START, SCORE
    private BattleRoom room;
}
