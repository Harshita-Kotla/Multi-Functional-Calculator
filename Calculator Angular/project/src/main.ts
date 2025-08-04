import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ArithmeticCalculatorComponent } from './components/arithmetic-calculator.component';
import { BmiCalculatorComponent } from './components/bmi-calculator.component';
import { UnitConverterComponent } from './components/unit-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ArithmeticCalculatorComponent,
    BmiCalculatorComponent,
    UnitConverterComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">Multi Calculator Suite</h1>
        <p class="app-subtitle">Professional calculators for everyday use</p>
      </header>

      <main class="main-content">
        <div class="tab-container">
          <div class="tab-buttons">
            <button 
              *ngFor="let tab of tabs; let i = index"
              class="tab-button"
              [class.active]="activeTab === i"
              (click)="setActiveTab(i)"
            >
              <span class="tab-icon">{{ tab.icon }}</span>
              <span class="tab-label">{{ tab.label }}</span>
            </button>
          </div>

          <div class="tab-content">
            <div class="tab-panel" [class.active]="activeTab === 0">
              <app-arithmetic-calculator></app-arithmetic-calculator>
            </div>
            <div class="tab-panel" [class.active]="activeTab === 1">
              <app-bmi-calculator></app-bmi-calculator>
            </div>
            <div class="tab-panel" [class.active]="activeTab === 2">
              <app-unit-converter></app-unit-converter>
            </div>
          </div>
        </div>
      </main>

      <footer class="app-footer">
        <p>&copy; 2025 Calculator Suite. Built with Angular & Spring Boot.</p>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      text-align: center;
      padding: 3rem 1rem 2rem;
      color: white;
    }

    .app-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .app-subtitle {
      font-size: 1.125rem;
      opacity: 0.9;
      font-weight: 300;
    }

    .main-content {
      flex: 1;
      padding: 0 1rem 2rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .tab-container {
      width: 100%;
      max-width: 600px;
    }

    .tab-buttons {
      display: flex;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 0.5rem;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .tab-button {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      padding: 0.75rem 0.5rem;
      background: transparent;
      border: none;
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
    }

    .tab-button:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .tab-button.active {
      background: white;
      color: #374151;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .tab-icon {
      font-size: 1.25rem;
    }

    .tab-label {
      font-weight: 500;
      white-space: nowrap;
    }

    .tab-content {
      position: relative;
    }

    .tab-panel {
      display: none;
      animation: fadeIn 0.3s ease-in-out;
    }

    .tab-panel.active {
      display: block;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .app-footer {
      text-align: center;
      padding: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 640px) {
      .app-title {
        font-size: 2rem;
      }

      .app-subtitle {
        font-size: 1rem;
      }

      .tab-button {
        padding: 0.5rem 0.25rem;
        font-size: 0.75rem;
      }

      .tab-icon {
        font-size: 1rem;
      }

      .main-content {
        padding: 0 0.5rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .tab-buttons {
        flex-direction: column;
        gap: 0.25rem;
      }

      .tab-button {
        flex-direction: row;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem;
      }
    }
  `]
})
export class App {
  activeTab = 0;
  
  tabs = [
    { label: 'Arithmetic', icon: '🧮' },
    { label: 'BMI', icon: '⚖️' },
    { label: 'Converter', icon: '📏' }
  ];

  setActiveTab(index: number) {
    this.activeTab = index;
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));