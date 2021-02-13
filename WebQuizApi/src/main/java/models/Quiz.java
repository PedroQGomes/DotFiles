package models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Quiz {


    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    private String title;

    private String text;

    private String[] options;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private int answer;


    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
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

    public String[] getOptions() {
        return options;
    }

    public void setOptions(String[] options) {
        this.options = options;
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
