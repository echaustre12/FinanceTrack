package com.financetrack;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FinanceTrackApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinanceTrackApplication.class, args);
	}
}