import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from '../services/calculator.service';
import { BmiRequest } from '../models/calculator.models';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="calculator-card">
      <h2 class="calculator-title">BMI Calculator</h2>
      
      <form (ngSubmit)="calculate()" class="calculator-form">
        <div class="input-group">
          <label for="weight">Weight (kg)</label>
          <input 
            type="number" 
            id="weight" 
            [(ngModel)]="weight" 
            name="weight" 
            required
            min="1"
            step="0.1"
            class="form-input"
            placeholder="Enter your weight in kg"
          >
        </div>

        <div class="input-group">
          <label for="height">Height (m)</label>
          <input 
            type="number" 
            id="height" 
            [(ngModel)]="height" 
            name="height" 
            required
            min="0.1"
            step="0.01"
            class="form-input"
            placeholder="Enter your height in meters"
          >
        </div>

        <button 
          type="submit" 
          class="calculate-btn"
          [disabled]="loading || !weight || !height"
        >
          <span *ngIf="loading" class="loading-spinner"></span>
          {{ loading ? 'Calculating...' : 'Calculate BMI' }}
        </button>
      </form>

      <div *ngIf="bmiResult" class="result-card" [ngClass]="getBmiClass(bmiResult.category)">
        <h3>Your BMI Result</h3>
        <p class="bmi-value">{{ bmiResult.bmi.toFixed(1) }}</p>
        <p class="bmi-category">{{ bmiResult.category }}</p>
        <div class="bmi-info">
          <p class="bmi-description">{{ getBmiDescription(bmiResult.category) }}</p>
        </div>
      </div>

      <div *ngIf="error" class="result-card error">
        <h3>Error</h3>
        <p>{{ error }}</p>
      </div>

      <div class="bmi-guide">
        <h4>BMI Categories</h4>
        <div class="category-list">
          <div class="category-item underweight">
            <span class="category-range">Below 18.5</span>
            <span class="category-name">Underweight</span>
          </div>
          <div class="category-item normal">
            <span class="category-range">18.5 - 24.9</span>
            <span class="category-name">Normal weight</span>
          </div>
          <div class="category-item overweight">
            <span class="category-range">25.0 - 29.9</span>
            <span class="category-name">Overweight</span>
          </div>
          <div class="category-item obese">
            <span class="category-range">30.0 and above</span>
            <span class="category-name">Obese</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calculator-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
    }

    .calculator-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .calculator-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-group label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-input {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: white;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .calculate-btn {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      padding: 0.875rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .calculate-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    .calculate-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .result-card {
      margin-top: 1.5rem;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
    }

    .result-card.underweight {
      background: #fef3c7;
      border: 1px solid #fcd34d;
      color: #92400e;
    }

    .result-card.normal {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
    }

    .result-card.overweight {
      background: #fef3c7;
      border: 1px solid #fcd34d;
      color: #92400e;
    }

    .result-card.obese {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
    }

    .result-card.error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
    }

    .result-card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .bmi-value {
      font-size: 3rem;
      font-weight: 700;
      margin: 0;
      line-height: 1;
    }

    .bmi-category {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0.5rem 0;
    }

    .bmi-info {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid currentColor;
      opacity: 0.8;
    }

    .bmi-description {
      margin: 0;
      font-size: 0.875rem;
    }

    .bmi-guide {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .bmi-guide h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      text-align: center;
    }

    .category-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.875rem;
    }

    .category-item.underweight {
      background: #fef3c7;
      color: #92400e;
    }

    .category-item.normal {
      background: #f0fdf4;
      color: #166534;
    }

    .category-item.overweight {
      background: #fef3c7;
      color: #92400e;
    }

    .category-item.obese {
      background: #fef2f2;
      color: #dc2626;
    }

    .category-range {
      font-weight: 500;
    }

    .category-name {
      font-weight: 600;
    }

    @media (max-width: 640px) {
      .calculator-card {
        padding: 1.5rem;
        margin: 1rem;
      }
      
      .calculator-title {
        font-size: 1.25rem;
      }

      .bmi-value {
        font-size: 2.5rem;
      }
    }
  `]
})
export class BmiCalculatorComponent {
  weight: number | null = null;
  height: number | null = null;
  bmiResult: { bmi: number; category: string } | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    if (!this.weight || !this.height) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.bmiResult = null;

    const request: BmiRequest = {
      weight: this.weight,
      height: this.height
    };

    this.calculatorService.calculateBmi(request).subscribe({
      next: (response) => {
        this.bmiResult = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to calculate BMI. Please check your input and try again.';
        this.loading = false;
        console.error('BMI calculation error:', error);
      }
    });
  }

  getBmiClass(category: string): string {
    return category.toLowerCase().replace(' ', '');
  }

  getBmiDescription(category: string): string {
    const descriptions = {
      'Underweight': 'Consider consulting with a healthcare provider about healthy weight gain strategies.',
      'Normal weight': 'Great! You\'re in the healthy weight range. Keep up the good work!',
      'Overweight': 'Consider adopting a balanced diet and regular exercise routine.',
      'Obese': 'Consider consulting with a healthcare provider about weight management strategies.'
    };
    return descriptions[category as keyof typeof descriptions] || '';
  }
}