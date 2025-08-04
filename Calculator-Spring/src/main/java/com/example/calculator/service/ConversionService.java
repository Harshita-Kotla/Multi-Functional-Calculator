package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class ConversionService {

    public double convert(double value, String fromUnit, String toUnit) {
        // Convert input to meters first
        double inMeters = switch (fromUnit.toLowerCase()) {
            case "cm" -> value / 100;
            case "km" -> value * 1000;
            default -> value;
        };

        // Convert meters to target unit
        return switch (toUnit.toLowerCase()) {
            case "cm" -> inMeters * 100;
            case "km" -> inMeters / 1000;
            default -> inMeters;
        };
    }
}
