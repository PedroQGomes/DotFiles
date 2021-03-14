package services;


import models.Solved;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import repository.SolvedRepository;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class SolvedService {

    @Autowired
    SolvedRepository solvedRepository;


    public Page<Solved> getAllSolvedPage(Integer pageNo, Integer pageSize, String username) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("completedAt").descending());

        return solvedRepository.findByUser(username,paging);
    }

    public void saveRightAnswer (String username, int idquiz) {
        Date date = new Date(System.currentTimeMillis());
        Solved sv = new Solved();
        sv.setUser(username);
        sv.setCompletedAt(date);
        sv.setIdQuiz(idquiz);
        solvedRepository.save(sv);
    }

}
