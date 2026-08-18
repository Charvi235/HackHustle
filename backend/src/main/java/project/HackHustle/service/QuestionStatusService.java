package project.HackHustle.service;

import project.HackHustle.dto.QuestionStatusDto;

import java.util.List;

public interface QuestionStatusService {
    public boolean saveStatus(QuestionStatusDto questionStatusDto);
    public List<Long> getListVisited(String emailId);
}

