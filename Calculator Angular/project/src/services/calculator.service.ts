import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  ArithmeticRequest, 
  ArithmeticResponse, 
  BmiRequest, 
  BmiResponse, 
  ConversionRequest, 
  ConversionResponse 
} from '../models/calculator.models';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  // ✅ Correct backend URL
  private baseUrl = 'https://multi-functional-calculator-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  calculateArithmetic(request: ArithmeticRequest): Observable<ArithmeticResponse> {
    return this.http.post<ArithmeticResponse>(`${this.baseUrl}/calculator/calculate`, request);
  }

  calculateBmi(request: BmiRequest): Observable<BmiResponse> {
    return this.http.post<BmiResponse>(`${this.baseUrl}/bmi/calculate`, request);
  }

  convertUnits(request: ConversionRequest): Observable<ConversionResponse> {
    return this.http.post<ConversionResponse>(`${this.baseUrl}/conversion/convert`, request);
  }
}
