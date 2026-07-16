package com.financetrack.dto;

public class DeleteSavingGoalRequest {
    private int destinationGoalId;

    public DeleteSavingGoalRequest() {
    }
    public int getDestinationGoalId() {
        return destinationGoalId;
    }
    public void setDestinationGoalId(int destinationGoalId) {
        this.destinationGoalId = destinationGoalId;
    }
}