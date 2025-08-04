package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double calculate(double num1, double num2, String operation) {
        return switch (operation.toLowerCase()) {
            case "add" -> num1 + num2;
            case "subtract" -> num1 - num2;
            case "multiply" -> num1 * num2;
            case "divide" -> num2 != 0 ? num1 / num2 : 0;
            default -> throw new IllegalArgumentException("Invalid operation");
        };
    }
}
