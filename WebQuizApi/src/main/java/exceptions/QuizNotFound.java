package exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No such quiz")
public class QuizNotFound extends RuntimeException{

    public QuizNotFound(){
        super();
    }
}