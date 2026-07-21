package org.diecocan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ToolsApp {
    public static void main(String[] args) {
        SpringApplication.run(ToolsApp.class, args);

        System.out.println("Diecocan tools app is running");
    }
}