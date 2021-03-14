package controllers;

import exceptions.QuizNotFound;
import models.Answer;
import models.Quiz;
import models.SolveQuiz;
import models.Solved;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import services.QuizService;
import services.SolvedService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
public class QuizController {



    @Autowired
    private QuizService quizService;


    @Autowired
    private SolvedService solvedService;

    //adicionar um novo quiz
    @PostMapping(path = "/api/quizzes")
    public Quiz setQuiz(@Valid @RequestBody Quiz quiz,@AuthenticationPrincipal UserDetails userDetails){
        quiz.setOwner(userDetails.getUsername());
        quizService.saveQuiz(quiz);
        return quiz;
    }

    @GetMapping(path = "/api/quizzes/{id}")
    public Quiz getQuiz(@PathVariable int id){

        Quiz q = quizService.getQuiz(id);

        if(q == null){
            throw new QuizNotFound("no such quiz");
        }
        return q;
    }

    @GetMapping(path = "/api/quizzes")
    public Page<Quiz> getALLQuiz(@RequestParam(name = "page",defaultValue = "0") Integer page){
        return quizService.getAllQuizPage(page,10);
    }


    @PostMapping(path = "/api/quizzes/{id}/solve")
    public Answer getAnswer(@PathVariable int id,@Valid @RequestBody SolveQuiz answer,@AuthenticationPrincipal UserDetails userDetails){

        Quiz quiz = quizService.getQuiz(id);
        if(quiz == null){
            throw new QuizNotFound("no such quiz");
        }



        if(quiz.getAnswer()==null && answer.getAnswer().size() == 0){
            solvedService.saveRightAnswer(userDetails.getUsername(),quiz.getId());
            return new Answer(true, "Congratulations, you're right!");
        }

        if(quiz.getAnswer().size()==0 && answer.getAnswer().size() == 0){
            solvedService.saveRightAnswer(userDetails.getUsername(),quiz.getId());
            return new Answer(true, "Congratulations, you're right!");
        }

        if(quiz.getAnswer()==null && answer.getAnswer().size() > 0){
            return new Answer(false, "Wrong answer! Please, try again.");
        }

        Set<Integer> actual = new HashSet<>(quiz.getAnswer());

        Set<Integer> given = new HashSet<>(answer.getAnswer());

        boolean resposta = actual.equals(given);

        if(resposta) {
            solvedService.saveRightAnswer(userDetails.getUsername(),quiz.getId());
            return new Answer(true, "Congratulations, you're right!");
        }else {
            return new Answer(false, "Wrong answer! Please, try again.");
        }
    }


    @DeleteMapping(path = "/api/quizzes/{id}")
    public void deleteQuiz(@PathVariable int id,@AuthenticationPrincipal UserDetails userDetails,HttpServletResponse response){

        Quiz q = quizService.getQuiz(id);

        if(q == null){
            throw new QuizNotFound("no such quiz");
        }

        if(!userDetails.getUsername().equals(q.getOwner())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You need to be the creator of the quiz");
        }

        quizService.deleteQuiz(q);
        response.setStatus(HttpStatus.NO_CONTENT.value());


    }


    @GetMapping(path = "/api/quizzes/completed")
    public Page<Solved> getALLSolved(@RequestParam(name = "page",defaultValue = "0") Integer page, @AuthenticationPrincipal UserDetails userDetails){
        return solvedService.getAllSolvedPage(page,10,userDetails.getUsername());
    }

}
