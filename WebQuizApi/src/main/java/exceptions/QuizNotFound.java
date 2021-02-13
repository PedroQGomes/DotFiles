package exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class QuizNotFound extends RuntimeException{

    public QuizNotFound(){
        super();
    }

    public QuizNotFound(String message){
        super(message);
    }
}