package engine;

import models.Answer;
import models.Quiz;
import org.springframework.web.bind.annotation.*;

@RestController
public class QuizController {


    @GetMapping(path = "/api/quiz")
    public Quiz getQuiz(){
        String[] arr = {"Robot","Tea leaf","Cup of coffee","Bug"};
        return new Quiz("The Java Logo","What is depicted on the Java logo?",arr);
    }


    @PostMapping(path = "/api/quiz")
    public Answer getAnswer(@RequestParam("answer") int answer){
        if(answer == 2){
            return new Answer(true,"Congratulations, you're right!");
        }else {
            return new Answer(false,"Wrong answer! Please, try again.");
        }

    }

}