package project.HackHustle.service;

import project.HackHustle.dto.DoubtDto;

import java.util.List;

public interface DoubtService {

    DoubtDto saveDoubt(DoubtDto doubtDto) ;

    DoubtDto updateDoubt(DoubtDto doubtDto);

    void deleteDoubt(Long doubtID);

    List<DoubtDto> teacherDoubtList(Long teacherID);

    List<DoubtDto> studentDoubtList(Long studentId);

    DoubtDto createDoubt(DoubtDto doubtDto);

    List<DoubtDto> teacherResolvedDoubtList(Long teacherID);
}
