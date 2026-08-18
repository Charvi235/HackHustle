package project.HackHustle.battle;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;


@Service
public class BattleManager {

    private Map<String, BattleRoom> activeBattles = new ConcurrentHashMap<>();


    public String createBattle(Long hostId) {

        String code = generateCode();

        BattleRoom room = new BattleRoom();
        room.setBattleCode(code);
        room.setHostId(hostId);
        room.getPlayers().add(hostId);
        room.getScores().put(hostId, 0);

        activeBattles.put(code, room);

        return code;
    }

    public BattleRoom getRoom(String code) {
        return activeBattles.get(code);
    }

    private String generateCode() {
        return UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
    public BattleRoom joinBattle(String code, Long studentId) {

        BattleRoom room = activeBattles.get(code);

        if (room == null)
            throw new RuntimeException("Invalid Code");

        if (room.getPlayers().size() >= 5)
            throw new RuntimeException("Battle Full");

        if (room.getStatus() != BattleStatus.WAITING)
            throw new RuntimeException("Battle Already Started");

        if (room.getPlayers().contains(studentId))
            throw new RuntimeException("Already Joined");

        room.getPlayers().add(studentId);
        room.getScores().put(studentId, 0);

        return room;
    }

    public void startBattle(String code, Long studentId) {

        BattleRoom room = activeBattles.get(code);

        if (room == null)
            throw new RuntimeException("Invalid Code");

        if (!room.getHostId().equals(studentId))
            throw new RuntimeException("Only Host Can Start");

        if (room.getPlayers().size() < 2)
            throw new RuntimeException("Minimum 2 Players Required");

        if (room.getStatus() != BattleStatus.WAITING)
            throw new RuntimeException("Battle Already Started");

        room.setStatus(BattleStatus.LIVE);
    }


}
