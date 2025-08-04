package com.example.calculator.model;

public class ConversionRequest {
    private double value;
    private String fromUnit; // m, cm, km
    private String toUnit;   // m, cm, km

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    public String getFromUnit() { return fromUnit; }
    public void setFromUnit(String fromUnit) { this.fromUnit = fromUnit; }

    public String getToUnit() { return toUnit; }
    public void setToUnit(String toUnit) { this.toUnit = toUnit; }
}
