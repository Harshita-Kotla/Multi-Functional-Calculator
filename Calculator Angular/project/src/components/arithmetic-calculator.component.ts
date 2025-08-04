import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from '../services/calculator.service';
import { ArithmeticRequest } from '../models/calculator.models';

@Component({
  selector: 'app-arithmetic-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="calculator-card">
      <h2 class="calculator-title">Arithmetic Calculator</h2>
      
      <form (ngSubmit)="calculate()" class="calculator-form">
        <div class="input-group">
          <label for="num1">First Number</label>
          <input 
            type="number" 
            id="num1" 
            [(ngModel)]="num1" 
            name="num1" 
            required
            class="form-input"
            placeholder="Enter first number"
          >
        </div>

        <div class="input-group">
          <label for="operation">Operation</label>
          <select 
            id="operation" 
            [(ngModel)]="operation" 
            name="operation" 
            required
            class="form-select"
          >
            <option value="">Select operation</option>
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
          </select>
        </div>

        <div class="input-group">
          <label for="num2">Second Number</label>
          <input 
            type="number" 
            id="num2" 
            [(ngModel)]="num2" 
            name="num2" 
            required
            class="form-input"
            placeholder="Enter second number"
          >
        </div>

        <button 
          type="submit" 
          class="calculate-btn"
          [disabled]="loading || !num1 || !num2 || !operation"
        >
          <span *ngIf="loading" class="loading-spinner"></span>
          {{ loading ? 'Calculating...' : 'Calculate' }}
        </button>
      </form>

      <div *ngIf="result !== null" class="result-card success">
        <h3>Result</h3>
        <p class="result-value">{{ formatResult(result) }}</p>
      </div>

      <div *ngIf="error" class="result-card error">
        <h3>Error</h3>
        <p>{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .calculator-card {
      background: linear-gradient(145deg, #ffffff, #f8fafc);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      max-width: 480px;
      margin: 2rem auto;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .calculator-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
    }

    .calculator-title {
      font-size: 1.75rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1e3a8a, #3b82f6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      text-align: center;
      letter-spacing: -0.025em;
    }

    .calculator-form {
      display: flex;
      flex-direction: column;
      gap: 1.75rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      position: relative;
    }

    .input-group label {
      font-weight: 600;
      color: #374151;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-left: 0.25rem;
    }

    .form-input, .form-select {
      padding: 1rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(145deg, #ffffff, #f8fafc);
      color: #1a202c;
      position: relative;
    }

    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #3b82f6;
      background: #ffffff;
      box-shadow: 
        0 0 0 4px rgba(59, 130, 246, 0.1),
        0 8px 25px -8px rgba(59, 130, 246, 0.3);
      transform: translateY(-1px);
    }

    .form-input:hover, .form-select:hover {
      border-color: #cbd5e1;
      transform: translateY(-0.5px);
    }

    .form-select {
      cursor: pointer;
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
      background-position: right 0.75rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 3rem;
    }

    .calculate-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1.125rem 2rem;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: relative;
      overflow: hidden;
    }

    .calculate-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .calculate-btn:hover:not(:disabled)::before {
      left: 100%;
    }

    .calculate-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 
        0 20px 25px -5px rgba(102, 126, 234, 0.4),
        0 10px 10px -5px rgba(102, 126, 234, 0.3);
    }

    .calculate-btn:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 
        0 10px 15px -3px rgba(102, 126, 234, 0.4),
        0 4px 6px -2px rgba(102, 126, 234, 0.3);
    }

    .calculate-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      background: #9ca3af;
    }

    .loading-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .result-card {
      margin-top: 2rem;
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      position: relative;
      backdrop-filter: blur(10px);
      animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .result-card.success {
      background: linear-gradient(145deg, #ecfdf5, #d1fae5);
      border: 2px solid #a7f3d0;
      color: #065f46;
      box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.2);
    }

    .result-card.error {
      background: linear-gradient(145deg, #fef2f2, #fee2e2);
      border: 2px solid #fca5a5;
      color: #991b1b;
      box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.2);
    }

    .result-card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .result-value {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background: linear-gradient(135deg, #065f46, #10b981);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Mobile Responsive */
    @media (max-width: 640px) {
      .calculator-card {
        padding: 2rem;
        margin: 1rem;
        border-radius: 16px;
      }
      
      .calculator-title {
        font-size: 1.5rem;
      }

      .form-input, .form-select {
        padding: 0.875rem 1rem;
        font-size: 0.95rem;
      }

      .calculate-btn {
        padding: 1rem 1.5rem;
        font-size: 1rem;
      }

      .result-value {
        font-size: 2rem;
      }
    }

    @media (max-width: 480px) {
      .calculator-card {
        padding: 1.5rem;
        margin: 0.5rem;
      }

      .calculator-form {
        gap: 1.5rem;
      }

      .input-group {
        gap: 0.5rem;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .calculator-card {
        background: linear-gradient(145deg, #1e293b, #0f172a);
        border-color: rgba(148, 163, 184, 0.1);
        color: #e2e8f0;
      }

      .input-group label {
        color: #cbd5e1;
      }

      .form-input, .form-select {
        background: linear-gradient(145deg, #334155, #1e293b);
        border-color: #475569;
        color: #e2e8f0;
      }

      .form-input:focus, .form-select:focus {
        background: #334155;
        border-color: #3b82f6;
      }

      .result-card.success {
        background: linear-gradient(145deg, #064e3b, #065f46);
        border-color: #047857;
        color: #a7f3d0;
      }

      .result-card.error {
        background: linear-gradient(145deg, #7f1d1d, #991b1b);
        border-color: #dc2626;
        color: #fca5a5;
      }
    }

    /* Enhanced animations */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .calculate-btn:disabled .loading-spinner {
      animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
    }

    /* Focus trap improvements */
    .form-input:focus,
    .form-select:focus,
    .calculate-btn:focus {
      z-index: 10;
      position: relative;
    }
  `]
})
export class ArithmeticCalculatorComponent {
  num1: number | null = null;
  num2: number | null = null;
  operation: string = '';
  result: number | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    if (!this.num1 || !this.num2 || !this.operation) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    const request: ArithmeticRequest = {
      num1: this.num1,
      num2: this.num2,
      operation: this.operation
    };

    this.calculatorService.calculateArithmetic(request).subscribe({
      next: (response) => {
        this.result = response.result;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to calculate. Please check your input and try again.';
        this.loading = false;
        console.error('Calculation error:', error);
      }
    });
  }

  formatResult(value: number): string {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }
}