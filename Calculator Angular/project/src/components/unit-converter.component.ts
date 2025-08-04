import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalculatorService } from '../services/calculator.service';
import { ConversionRequest } from '../models/calculator.models';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="calculator-card">
      <h2 class="calculator-title">Length Unit Converter</h2>
      
      <form (ngSubmit)="convert()" class="calculator-form">
        <div class="input-group">
          <label for="value">Value</label>
          <input 
            type="number" 
            id="value" 
            [(ngModel)]="value" 
            name="value" 
            required
            min="0"
            step="any"
            class="form-input"
            placeholder="Enter value to convert"
          >
        </div>

        <div class="conversion-row">
          <div class="input-group">
            <label for="fromUnit">From</label>
            <select 
              id="fromUnit" 
              [(ngModel)]="fromUnit" 
              name="fromUnit" 
              required
              class="form-select"
            >
              <option value="">Select unit</option>
              <option value="m">Meters (m)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="km">Kilometers (km)</option>
            </select>
          </div>

          <div class="conversion-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

          <div class="input-group">
            <label for="toUnit">To</label>
            <select 
              id="toUnit" 
              [(ngModel)]="toUnit" 
              name="toUnit" 
              required
              class="form-select"
            >
              <option value="">Select unit</option>
              <option value="m">Meters (m)</option>
              <option value="cm">Centimeters (cm)</option>
              <option value="km">Kilometers (km)</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          class="calculate-btn"
          [disabled]="loading || !value || !fromUnit || !toUnit"
        >
          <span *ngIf="loading" class="loading-spinner"></span>
          {{ loading ? 'Converting...' : 'Convert' }}
        </button>
      </form>

      <div *ngIf="result !== null" class="result-card success">
        <h3>Conversion Result</h3>
        <div class="conversion-result">
          <div class="conversion-from">
            <span class="value">{{ value }}</span>
            <span class="unit">{{ getUnitName(fromUnit) }}</span>
          </div>
          <div class="equals">=</div>
          <div class="conversion-to">
            <span class="value">{{ formatResult(result) }}</span>
            <span class="unit">{{ getUnitName(toUnit) }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="error" class="result-card error">
        <h3>Error</h3>
        <p>{{ error }}</p>
      </div>

      <div class="conversion-guide">
        <h4>Quick Reference</h4>
        <div class="reference-list">
          <div class="reference-item">
            <span>1 kilometer</span>
            <span>=</span>
            <span>1,000 meters</span>
          </div>
          <div class="reference-item">
            <span>1 meter</span>
            <span>=</span>
            <span>100 centimeters</span>
          </div>
          <div class="reference-item">
            <span>1 kilometer</span>
            <span>=</span>
            <span>100,000 centimeters</span>
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

    .form-input, .form-select {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease;
      background: white;
    }

    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .conversion-row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1rem;
      align-items: end;
    }

    .conversion-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }

    .calculate-btn {
      background: linear-gradient(135deg, #f59e0b, #d97706);
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
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
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

    .result-card.success {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
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

    .conversion-result {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .conversion-from, .conversion-to {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .conversion-from .value, .conversion-to .value {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .conversion-from .unit, .conversion-to .unit {
      font-size: 0.875rem;
      font-weight: 500;
      opacity: 0.8;
    }

    .equals {
      font-size: 1.25rem;
      font-weight: 600;
      color: #6b7280;
    }

    .conversion-guide {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .conversion-guide h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #374151;
      text-align: center;
    }

    .reference-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .reference-item {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      padding: 0.5rem 0.75rem;
      background: #f9fafb;
      border-radius: 6px;
      font-size: 0.875rem;
      text-align: center;
    }

    .reference-item span:first-child,
    .reference-item span:last-child {
      font-weight: 500;
    }

    .reference-item span:nth-child(2) {
      color: #6b7280;
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

      .conversion-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .conversion-arrow {
        transform: rotate(90deg);
        margin: 0;
      }

      .conversion-result {
        flex-direction: column;
        gap: 0.5rem;
      }

      .equals {
        transform: rotate(90deg);
      }
    }
  `]
})
export class UnitConverterComponent {
  value: number | null = null;
  fromUnit: string = '';
  toUnit: string = '';
  result: number | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  convert() {
    if (!this.value || !this.fromUnit || !this.toUnit) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    const request: ConversionRequest = {
      value: this.value,
      fromUnit: this.fromUnit,
      toUnit: this.toUnit
    };

    this.calculatorService.convertUnits(request).subscribe({
      next: (response) => {
        this.result = response.result;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to convert units. Please check your input and try again.';
        this.loading = false;
        console.error('Conversion error:', error);
      }
    });
  }

  getUnitName(unit: string): string {
    const unitNames = {
      'm': 'meters',
      'cm': 'centimeters',
      'km': 'kilometers'
    };
    return unitNames[unit as keyof typeof unitNames] || unit;
  }

  formatResult(value: number): string {
    if (value === 0) return '0';
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(2);
    }
    if (Math.abs(value) < 0.001) {
      return value.toExponential(2);
    }
    return Number.isInteger(value) ? value.toString() : value.toFixed(6).replace(/\.?0+$/, '');
  }
}