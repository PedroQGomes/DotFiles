package services;

import models.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import repository.QuizRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;



    public void saveQuiz(Quiz q){
        quizRepository.save(q);
    }

    public Quiz getQuiz(int id){
        if(quizRepository.findById(id).isPresent()){
            return quizRepository.findById(id).get();
        }
        return null;
    }

    public List<Quiz> getAllQuiz(){
        return (List<Quiz>) quizRepository.findAll();
    }


    public void deleteQuiz(Quiz quiz){
        quizRepository.delete(quiz);
    }

    public Page<Quiz> getAllQuizPage(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("id").ascending());

        return quizRepository.findAll(paging);

    }

}
