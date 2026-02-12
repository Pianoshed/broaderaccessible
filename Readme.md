# BRAIN NGO Website

**BRAIN** (Building Resilient and Inclusive Health Networks) is dedicated to advancing sustainable, evidence-based health interventions that strengthen governance, service delivery, and community health systems. Our mission is to improve health outcomes in communities by focusing on inclusive, equitable, and high-quality care.

This repository contains the official website for BRAIN, showcasing our programs, initiatives, and engagement with the community. The site also supports newsletter subscriptions and visitor tracking to enhance outreach and engagement.

## About BRAIN

BRAIN focuses on:

- **Maternal and Child Health** – improving outcomes for mothers and children through community interventions and healthcare services.  
- **Reproductive Health & Family Planning** – providing education and resources for healthy family planning.  
- **Malaria Prevention** – promoting preventive strategies and awareness campaigns.  
- **HIV/AIDS Care and Prevention** – ensuring access to testing, treatment, and support services.

Through strategic partnerships and community engagement, BRAIN contributes to the achievement of the **Sustainable Development Goals (SDGs)**, particularly **SDG 3: Good Health and Well-being**.  

We emphasize **strengthening primary health care and community systems** to ensure inclusive and equitable access to quality care.

## 🖥 Website Features

- **Informational Pages:**  
  - Home, About Us, Health Systems, Priority Areas, Involved Communities, Newsletter, Admin
- **Newsletter Subscription:** Users can subscribe via email, stored in a CSV file.
- **Visitor Tracking:** Tracks visitors’ IPs and user agents for analytics and engagement.
- **Admin Dashboard:** Allows secure access to subscriber data.
- **Static File Serving:** Supports delivery of static resources like images, PDFs, and documents.
- **Sitemap Generation:** Provides a sitemap for SEO and search engine indexing.

## Tech Stack

- **Backend:** Python, Flask  
- **Database:** SQLite (lightweight, embedded)  
- **Frontend:** HTML, CSS, JS (Flask templates)  
- **Data Management:** CSV for newsletter subscriptions and visitor logs  
- **Deployment:** Can be deployed on any standard Flask-supported web server

## Project Structure

.
├── app.py # Main Flask application
├── database.db # SQLite database file
├── templates/ # HTML templates for pages
├── static/ # Static files (CSS, JS, images)
├── newsletter_subscriptions.csv # Stores newsletter subscribers
├── visitor_log.csv # Logs visitor data
└── README.md # Project documentation
