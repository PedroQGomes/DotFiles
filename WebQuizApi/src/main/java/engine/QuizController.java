package engine;

import exceptions.QuizNotFound;
import models.Answer;
import models.Quiz;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class QuizController {

    private AtomicInteger nextid = new AtomicInteger();

    private Map<Integer,Quiz> allQuiz = new HashMap<>();


    //adicionar um novo quiz
    @PostMapping(path = "/api/quizzes")
    public Quiz setQuiz(@RequestBody Quiz quiz){

        quiz.setId(nextid.incrementAndGet());
        allQuiz.put(quiz.getId(),quiz);
        System.out.println("adicionar" + quiz.getId());
        return quiz;
    }

    @GetMapping(path = "/api/quizzes/{id}")
    public Quiz getQuiz(@PathVariable int id){

        if(allQuiz.containsKey(id)){
            return allQuiz.get(id);

        }else {
            throw new QuizNotFound("no such quiz");
        }
    }

    @GetMapping(path = "/api/quizzes")
    public List<Quiz> getALLQuiz(){

        ArrayList<Quiz> resposta = new ArrayList<>();
        for(Map.Entry<Integer,Quiz> entry:allQuiz.entrySet()){
            resposta.add(entry.getValue());
        }
        return resposta;
    }


    @PostMapping(path = "/api/quizzes/{id}/solve")
    public Answer getAnswer(@PathVariable int id,@RequestParam("answer") int answer){

        Quiz quiz;
        if(allQuiz.containsKey(id)){
            quiz = allQuiz.get(id);
        }else {
            throw new QuizNotFound("no such quiz");
        }

        if(quiz.getAnswer()==answer){
            return new Answer(true,"Congratulations, you're right!");
        }{
            return new Answer(false,"Wrong answer! Please, try again.");
        }


    }




}
