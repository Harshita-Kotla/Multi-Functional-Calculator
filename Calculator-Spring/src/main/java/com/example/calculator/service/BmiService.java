package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class BmiService {
    public double calculateBmi(double weight, double height) {
        return weight / (height * height);
    }

    public String getBmiCategory(double bmi) {
        if (bmi < 18.5) return "Underweight";
        else if (bmi < 24.9) return "Normal weight";
        else if (bmi < 29.9) return "Overweight";
        else return "Obese";
    }
}
