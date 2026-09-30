# LoanWise - Integrated Machine Learning Loan Default & Approval Platform

LoanWise is a production-ready Machine Learning web application that connects an interactive React frontend with a Python FastAPI ML backend. It uses a trained Scikit-Learn Logistic Regression model (`loan_model.pkl`), standard scaler (`loan_scaler.pkl`), and feature definition (`feature_names.pkl`) to evaluate loan default risk in real time across 16 borrower attributes.

---

## 🚀 Quick Start Guide

### 1. Start the Python ML Backend (FastAPI)
In a terminal, navigate to the project root and run:
```bash
python server.py
```
* The backend API server starts at: `http://127.0.0.1:8000`
* Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### 2. Start the React Frontend (Vite)
In another terminal, run:
```bash
npm install
npm run dev
```
* The web application opens at: `http://localhost:5173/`

---

## 🧠 Machine Learning Architecture & Features

The model evaluates **16 input parameters** mapped into **24 one-hot scaled features**:

1. **Personal Demographics**:
   - `Age`, `Income`, `Education` (`Bachelor's`, `Master's`, `PhD`, `High School`), `MaritalStatus` (`Divorced`, `Married`, `Single`), `HasDependents` (`No`, `Yes`), `HasMortgage` (`No`, `Yes`)
2. **Employment & Credit Profile**:
   - `EmploymentType` (`Full-time`, `Part-time`, `Self-employed`, `Unemployed`), `MonthsEmployed`, `CreditScore` (300–850), `NumCreditLines`, `DTIRatio` (Debt-to-Income), `HasCoSigner` (`No`, `Yes`)
3. **Loan Request Parameters**:
   - `LoanAmount`, `InterestRate`, `LoanTerm` (Months), `LoanPurpose` (`Business`, `Home`, `Auto`, `Education`, `Personal`, `Other`)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` or `/api/health` | Service health status and loaded model verification |
| `POST` | `/predict` or `/api/predict` | ML inference engine returning approval decision, probabilities, and factors |
| `GET` | `/api/applicants` | Fetch active underwriting applicant records |
| `POST` | `/api/applicants` | Add a new applicant with instant ML scoring |
| `PUT` | `/api/applicants/{id}` | Update applicant dossier information |
| `DELETE` | `/api/applicants/{id}` | Delete an applicant record |
| `GET` | `/api/analytics` | Macro portfolio statistics, monthly trend, and distributions |
| `GET` | `/api/model-info` | Model cross-validation metrics and feature definitions |
| `GET` / `POST` | `/api/settings` | Retrieve or update active classifier threshold |

---

## 🛡️ Key Features

- **Trained Model Connection**: Uses pre-trained `loan_model.pkl` and `loan_scaler.pkl` with exact feature pipelines.
- **Identical UI & Styling**: Preserves the complete visual design, theme, components, typography, and animations.
- **Robust Error Handling & Fallbacks**: Handles network disconnections gracefully without UI degradation.
- **Live Underwriting Analytics**: Real-time summary statistics, risk charts, and applicant dossier management.
