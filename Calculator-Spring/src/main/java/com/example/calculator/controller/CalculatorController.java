package com.example.calculator.controller;

import com.example.calculator.model.ArithmeticRequest;
import com.example.calculator.model.ArithmeticResponse;
import com.example.calculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "*") // Allow Angular frontend
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public ArithmeticResponse calculate(@RequestBody ArithmeticRequest request) {
        double result = calculatorService.calculate(request.getNum1(), request.getNum2(), request.getOperation());
        return new ArithmeticResponse(result);
    }
}
