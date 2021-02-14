package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.*;
import java.util.List;

public class Quiz {


    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Text cannot be blank")
    private String text;

    @NotNull(message = "options cannot be null")
    @Size(min=2,message = "should contain at least 2 items")
    private List<String> options;


    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Integer> answer;


    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public List<Integer> getAnswer() {
        return answer;
    }

    public void setAnswer(List<Integer> answer) {
        this.answer = answer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;

        if (obj == null)
            return false;

        Quiz quiz = (Quiz) obj;
        return this.id == quiz.id;
    }
}
