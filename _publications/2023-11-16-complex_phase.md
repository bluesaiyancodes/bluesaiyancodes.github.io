---
title: "Complex-Phase Steel Microstructure Segmentation Using UNet: Analysis across Different Magnifications and Steel Types"
collection: publications
category: manuscripts
permalink: /publication/2023-11-16-complex_phase
excerpt: 'This paper is about complex phase microstruture segmentation using UNet where we train the model on one type of steel and inference on other types.'
date: 2023-11-16
venue: 'Materials, MDPI'
paperurl: 'https://www.mdpi.com/1996-1944/16/23/7254'
---
<mark>DOI: <a href="https://doi.org/10.3390/ma16237254">https://doi.org/10.3390/ma16237254</a></mark>  
The quantification of the phase fraction is critical in materials science, bridging the gap between material composition, processing techniques, microstructure, and resultant properties. Traditional methods involving manual annotation are precise but labor-intensive and prone to human inaccuracies. We propose an automated segmentation technique for high-tensile strength alloy steel, where the complexity of microstructures presents considerable challenges. Our method leverages the UNet architecture, originally developed for biomedical image segmentation, and optimizes its performance via careful hyper-parameter selection and data augmentation. We employ Electron Backscatter Diffraction (EBSD) imagery for complex-phase segmentation and utilize a combined loss function to capture both textural and structural characteristics of the microstructures. Additionally, this work is the first to examine the scalability of the model across varying magnifications and types of steel and achieves high accuracy in terms of dice scores demonstrating the adaptability and robustness of the model.