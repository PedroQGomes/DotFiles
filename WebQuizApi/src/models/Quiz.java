package models;

public class Quiz {

    private String title;
    private String text;
    private String[] options;


    public Quiz(String title,String text,String[] opt){
        this.title =title;
        this.text = text;
        this.options = opt;
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
}
