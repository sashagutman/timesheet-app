# 📅 Employee Timesheet App (PDF + Signature + RTL)

A modern React + TypeScript application for generating and managing employee timesheets.

Built as a real-world solution for tracking working hours, generating printable reports, and signing them digitally.

🔗 Live Demo: https://timesheet-app-d22.pages.dev
📂 GitHub Repository: https://github.com/sashagutman/timesheet-app

---

## 🚀 Features

✅ Generate dynamic monthly timesheets  
✅ Custom weekend configuration (e.g. Friday–Saturday)  
✅ Adjust daily working hours (+ / -)  
✅ Change day status (Work / Sick / Vacation / Weekend)  
✅ Automatic end-time calculation  
✅ Monthly summary (standard vs actual hours)  

✍️ Digital signature (Canvas API)  
🌍 Multi-language support (EN / RU / HE)  
↔️ RTL layout support for Hebrew  

🖨 Print / PDF export (A4 optimized)  
💾 LocalStorage auto-save  
📱 Responsive clean UI  

---

## 🛠 Tech Stack

- React  
- TypeScript  
- React Router  
- i18next (multi-language support)  
- Canvas API (signature)  
- CSS (custom styling)  
- LocalStorage API  

---

## 📊 How It Works

- User fills in timesheet form  
- Days are generated dynamically based on:
  - Selected month  
  - Weekend configuration  
  - Working hours  

- State updates immutably  
- Summary calculates:
  - Standard monthly hours  
  - Actual worked hours  

- Data is persisted in LocalStorage  

---

## 🖨 Print Mode

Optimized for A4 printing using CSS `@media print`.

---

## 📌 Future Improvements

- Export to Excel  
- User authentication  
- Backend integration  
- Multi-employee management  
- Dashboard & analytics  
