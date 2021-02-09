package models;

public class Answer {

    private boolean success;

    private String feedback;

    public Answer(boolean succ, String feed){
        this.success = succ;
        this.feedback = feed;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
