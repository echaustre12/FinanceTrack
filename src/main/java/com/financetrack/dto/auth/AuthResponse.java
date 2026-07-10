package com.financetrack.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String phoneNumber;
    //Constructor
    public AuthResponse(String token, String name, String email, String phoneNumber) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    //Getters
    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
}