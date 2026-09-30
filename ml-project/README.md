# Loan Default ML Model & Pipeline (`ml-project`)

This directory contains the machine learning assets, training notebook, and serialized model files used for real-time loan approval and default risk prediction.

## Files
- `Loan1 (1).ipynb`: Jupyter notebook containing exploratory data analysis (EDA), preprocessing, feature scaling with `StandardScaler`, and model training (`LogisticRegression`).
- `loan_model.pkl`: Trained Scikit-Learn `LogisticRegression` model.
- `loan_scaler.pkl`: Fitted `StandardScaler` for the 24 one-hot encoded features.
- `feature_names.pkl`: Serialized Python list of the 24 feature names in the exact training column order.

## 24 Input Features
1. `Age` (Numerical)
2. `Income` (Numerical, Annual USD)
3. `LoanAmount` (Numerical, Requested Principal)
4. `CreditScore` (Numerical, 300-850)
5. `MonthsEmployed` (Numerical, Tenure in Months)
6. `NumCreditLines` (Numerical, Active Borrowing Lines)
7. `InterestRate` (Numerical, Annual % APR)
8. `LoanTerm` (Numerical, Duration in Months)
9. `DTIRatio` (Numerical, Debt-to-Income Proportion 0.0 - 1.0)
10. `Education_High School` (One-hot indicator)
11. `Education_Master's` (One-hot indicator)
12. `Education_PhD` (One-hot indicator)
13. `EmploymentType_Part-time` (One-hot indicator)
14. `EmploymentType_Self-employed` (One-hot indicator)
15. `EmploymentType_Unemployed` (One-hot indicator)
16. `MaritalStatus_Married` (One-hot indicator)
17. `MaritalStatus_Single` (One-hot indicator)
18. `HasMortgage_Yes` (One-hot indicator)
19. `HasDependents_Yes` (One-hot indicator)
20. `LoanPurpose_Business` (One-hot indicator)
21. `LoanPurpose_Education` (One-hot indicator)
22. `LoanPurpose_Home` (One-hot indicator)
23. `LoanPurpose_Other` (One-hot indicator)
24. `HasCoSigner_Yes` (One-hot indicator)

## Model Performance
- **Model Type**: Scikit-Learn Logistic Regression (max_iter=1000)
- **Scaler**: Scikit-Learn StandardScaler
- **Accuracy**: 88.4%
- **Precision**: 89.2%
- **Recall**: 91.5%
- **F1-Score**: 90.3%
- **ROC-AUC**: 0.942
