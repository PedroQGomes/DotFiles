package exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class QuizNotFound extends RuntimeException{

    public QuizNotFound(){
        super();
    }

    public QuizNotFound(String message){
        super(message);
    }
}