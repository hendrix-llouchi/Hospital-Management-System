# Hospital-Management-System

 # 🏥 AI-Assisted Patient Management System

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Healthcare](https://img.shields.io/badge/domain-healthcare-green)

## 📌 Overview

The AI-Assisted Patient Management System (PMS) is a digital platform designed to improve hospital workflow and patient handling. The system enables seamless communication between nurses, doctors, and pharmacists while ensuring efficient patient flow using AI-assisted background processing and real-time notifications.

The platform allows healthcare staff to:

* Register patients and record medical information
* View patient records and medical history
* Conduct consultations
* Send prescriptions to pharmacists
* Receive real-time notifications between hospital roles

This system eliminates manual queue management by allowing an AI system to coordinate patient flow in the background.

---

# ✨ Features

## 🧑‍⚕️ Nurse Module

The Nurse Dashboard manages patient intake and initial medical information.

### Patient Registration

Nurses record the following details:

* Name
* Age
* Gender
* Phone Number
* Temperature
* Weight
* Height
* Hospital ID
* NHIS Number *(optional)*
* Date
* Time

### Additional Notes

Nurses can record extra information such as:

* Symptoms
* Observations
* Initial patient remarks

### Notifications

Nurses receive notifications when:

* The doctor becomes available
* The next patient should be prepared for consultation

---

## 👨‍⚕️ Doctor Module

The Doctor Dashboard enables doctors to manage consultations and patient records.

### Patient Information

Doctors can view all patient details recorded by the nurse:

* Name
* Age
* Gender
* Phone Number
* Temperature
* Weight
* Height
* Hospital ID
* NHIS Number

### Medical Records

Doctors can access previous patient history including:

* Past visits
* Diagnoses
* Medical notes
* Previous prescriptions

### Diagnosis & Consultation Notes

Doctors can record:

* Diagnosis
* Medical observations
* Treatment recommendations

### Prescription System

Doctors can prescribe medications and send prescriptions directly to the pharmacist.

### Consultation Completion

When a consultation is completed, the system automatically notifies the nurse that the next patient can be prepared.

---

## 💊 Pharmacist Module

The Pharmacist Dashboard manages prescriptions received from doctors.

### Prescription Notifications

Pharmacists receive real-time alerts when a doctor prescribes medication.

### Prescription Details

Each prescription includes:

* Patient Name
* Hospital ID
* Phone Number
* Prescribed Drugs
* Dosage Instructions

### Prescription Status

Pharmacists can update prescription status to:

* Prepared
* Dispensed
* Completed

---

# 🤖 AI Workflow

The system includes an AI-assisted workflow that coordinates patient flow between hospital staff.

The AI system:

* Detects when the doctor is available
* Notifies nurses to prepare the next patient
* Maintains smooth consultation flow
* Removes the need for manual queue management

---

# 👥 System Roles

| Role       | Responsibilities                                                  |
| ---------- | ----------------------------------------------------------------- |
| Nurse      | Registers patients and records patient vitals                     |
| Doctor     | Reviews patient data, diagnoses conditions, prescribes medication |
| Pharmacist | Receives prescriptions and dispenses medication                   |

---

# 🔄 System Workflow

1. Patient arrives at the hospital
2. Nurse registers the patient and records vitals
3. The AI system manages consultation flow
4. Doctor reviews patient information
5. Doctor performs diagnosis and prescribes medication
6. Pharmacist receives the prescription
7. Pharmacist prepares and dispenses medication

---

# 🎨 Design Principles
 * Clean and intuitive healthcare dashboard UI
* Role-based interfaces for medical staff
* Real-time notifications
* Efficient communication between departments
* Simple and structured patient intake workflow

---

# 🚀 Future Improvements

* AI-powered symptom analysis
* Electronic Health Record (EHR) integration
* Mobile application for healthcare staff
* Hospital analytics dashboard
* NHIS verification integration

---

# 📜 License

This project is licensed under the MIT License.
├── frontend/                # Frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   │   ├── Login
│   │   │   ├── NurseDashboard
│   │   │   ├── DoctorDashboard
│   │   │   └── PharmacistDashboard
│   │   ├── services/         # API calls and services
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Helper functions
│   │
│   └── package.json