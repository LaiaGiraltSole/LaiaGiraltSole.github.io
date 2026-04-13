---
title: "EGC Heartbeat Classification and Deep Learning Analysis"
date: 2024-12-01T00:00:00Z
tags: [machine-learning, deep-learning, healthcare]
draft: false
---

## 🧠 ECG Heartbeat Classification with Transfer Learning

**Duration:** September – December 2024  
**Dataset:** 87,000+ ECG heartbeat images  
**Target:** 5 diagnostic categories (Normal, PVC, PAC, Fusion, Unknown)  
**Performance:** F1 Score 0.739 (+40% vs. baseline CNN)

---

## The Clinical Problem

Cardiac arrhythmias affect millions globally, yet manual ECG screening is time-consuming and prone to human error. Healthcare systems need automated classification systems that are:
- **Accurate:** Minimize false negatives (missed abnormalities)
- **Fast:** Real-time processing at scale
- **Reliable:** Handle class imbalance and noisy data

**Challenge:** ECG datasets suffer from severe class imbalance (abnormal cases are rare) and domain shift between hospitals.

---

## My Approach: Transfer Learning Pipeline

### 1️⃣ Dataset Engineering
- **87,000+** ECG images across 5 diagnostic classes
- **Problem Identified:** Severe class imbalance (~80% normal vs. ~5-10% each abnormal)
- **Solution:** Inverse-square-root weighted oversampling to handle minority classes
- **Result:** Balanced loss contributions without overfitting on synthetic data

### 2️⃣ Data Augmentation Strategy
- **Technique:** Probabilistic noise-based augmentation
- **Rationale:** Introduces realistic noise to simulate ECG sensors in different real-world conditions
- **Benefit:** Improved model robustness and generalization to unseen hospital data

### 3️⃣ Transfer Learning Architecture
**Why transfer learning?** Pre-trained models on ImageNet have learned general feature hierarchies (edges, textures, shapes) that transfer well to medical imaging.

- **ResNet-18:** 18-layer residual network, fast inference
- **DenseNet-121:** 121-layer dense connections, excellent feature reuse
- **Strategy:** Fine-tuned final layers while freezing early feature extraction layers

### 4️⃣ Robust Training Pipeline
- **Loss Function:** Weighted categorical cross-entropy to penalize misclassification of minority classes
- **Validation Strategy:** Stratified k-fold cross-validation to ensure each fold has balanced classes
- **Regularization:** Dropout + L2 regularization to prevent overfitting

---

## 🎯 Results

### Performance Metrics
| Model | Macro F1 | Weighted F1 | Improvement |
|-------|----------|------------|------------|
| Custom CNN | 0.525 | 0.718 | Baseline |
| ResNet-18 | 0.712 | 0.801 | +35% F1 |
| **DenseNet-121** | **0.739** | **0.821** | **+40% F1** ✓ |

### Why This Matters
- **40% improvement** in detecting rare classes (abnormal rhythms)
- **Better clinical utility:** Catches ~40 more abnormal cases per 100 screens
- **Generalizes well:** Tested on holdout set with minimal domain shift

---

## 🛠️ Technical Deep Dive

### Key Challenges & Solutions

**Challenge 1: Class Imbalance**
- Problem: Model learns to predict "Normal" and ignores rare abnormalities
- Solution: Inverse-square-root weighted oversampling + class weights in loss
- Result: Balanced performance across all 5 classes

**Challenge 2: Distribution Shift**  
- Problem: ECG data varies between hospitals (different sensors, patient populations)
- Solution: Probabilistic augmentation + transfer learning from diverse ImageNet features
- Result: Better generalization to real-world deployment

**Challenge 3: Interpretability**
- Problem: "Black box" deep learning models concern clinicians
- Solution: Generated confusion matrices + per-class performance analysis
- (Grad-CAM visualizations available in technical report)

---

## 📊 Technical Report

The full technical report contains:
- Detailed dataset analysis and class distribution plots
- All preprocessing and augmentation parameters
- Model architecture diagrams and hyperparameter tuning
- Training curves, confusion matrices, and per-class metrics
- Generalization analysis on holdout test set

[📋 Download Full Technical Report](/projects/EGC_Final_Report.pdf)

---

## 🔍 What I Learned

This project deepened my understanding of:

1. **Transfer learning strategically** — When to fine-tune vs. freeze layers
2. **Class imbalance in production** — Theory vs. practical implications for clinical ML
3. **Data augmentation as domain adaptation** — Not just for regularization, but for robustness
4. **Model evaluation rigorously** — Why macro F1 matters more than accuracy in imbalanced datasets
5. **Communicating uncertainty** — Why clinicians need confidence intervals, not just point predictions

---

## 📁 Artifacts

- ✅ Full technical report with reproducible experiments
- ✅ Model architecture diagrams  
- ✅ Per-class performance analysis
- ✅ Confusion matrices and evaluation metrics
- ✅ Generalization tests on holdout data

**Note:** Raw data is confidential due to healthcare regulations, but the methodology and architecture decisions are fully transferable to other medical imaging classification problems.



Resources

- [Download resume](/Laia_Giralt_Sole_Resume_04.2026.pdf)

- [EGC Project Report (PDF)](/projects/EGC_Final_Report.pdf)
