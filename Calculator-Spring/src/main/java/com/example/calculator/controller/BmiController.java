package com.example.calculator.controller;

import com.example.calculator.model.BmiRequest;
import com.example.calculator.model.BmiResponse;
import com.example.calculator.service.BmiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bmi")
@CrossOrigin(origins = "*")
public class BmiController {

    @Autowired
    private BmiService bmiService;

    @PostMapping("/calculate")
    public BmiResponse calculateBmi(@RequestBody BmiRequest request) {
        double bmi = bmiService.calculateBmi(request.getWeight(), request.getHeight());
        String category = bmiService.getBmiCategory(bmi);
        return new BmiResponse(bmi, category);
    }
}
