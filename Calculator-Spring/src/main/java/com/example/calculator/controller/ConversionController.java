package com.example.calculator.controller;

import com.example.calculator.model.ConversionRequest;
import com.example.calculator.model.ConversionResponse;
import com.example.calculator.service.ConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversion")
@CrossOrigin(origins = "*")
public class ConversionController {

    @Autowired
    private ConversionService conversionService;

    @PostMapping("/convert")
    public ConversionResponse convert(@RequestBody ConversionRequest request) {
        double result = conversionService.convert(request.getValue(), request.getFromUnit(), request.getToUnit());
        return new ConversionResponse(result);
    }
}
