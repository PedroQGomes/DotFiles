package services;

import models.Quiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.QuizRepository;

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
        return quizRepository.findAll();
    }

    public int getLastId(){
        return quizRepository.findAll().size();
    }

}
