// Request models
export interface ArithmeticRequest {
  num1: number;
  num2: number;
  operation: string;
}

export interface BmiRequest {
  weight: number;
  height: number;
}

export interface ConversionRequest {
  value: number;
  fromUnit: string;
  toUnit: string;
}

// Response models
export interface ArithmeticResponse {
  result: number;
}

export interface BmiResponse {
  bmi: number;
  category: string;
}

export interface ConversionResponse {
  result: number;
}