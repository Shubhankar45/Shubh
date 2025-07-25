# Replit.md - Shubhankar Patel Portfolio Website

## Overview

This is a personal portfolio website for Shubhankar Patel, a Computer Science undergraduate. The application is built using Python Flask as the backend framework with Jinja2 templating, styled with Bootstrap 5 and custom CSS featuring a modern dark theme with gold accents. The website showcases personal projects, skills, education, certifications, and provides contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Python Flask - chosen for its simplicity and rapid development capabilities
- **Template Engine**: Jinja2 (built into Flask) - provides dynamic content rendering
- **Session Management**: Flask sessions with secret key configuration
- **Logging**: Python's built-in logging module for debugging and monitoring
- **WSGI Middleware**: ProxyFix for handling reverse proxy headers

### Frontend Architecture
- **Styling Framework**: Bootstrap 5 - provides responsive grid system and pre-built components
- **Custom CSS**: CSS custom properties (variables) for consistent theming
- **JavaScript**: Vanilla JavaScript for smooth scrolling and interactive elements
- **Fonts**: Google Fonts (Inter) and Font Awesome icons
- **Theme**: Dark theme with black background (#0a0a0a) and gold accent (#ffd700)

### File Structure
```
/
├── app.py              # Main Flask application
├── main.py             # Application entry point
├── templates/
│   ├── base.html       # Base template with navigation
│   └── index.html      # Main portfolio page
├── static/
│   ├── css/style.css   # Custom styling
│   ├── js/script.js    # Client-side interactions
│   ├── img/            # Profile images
│   └── resume/         # Resume PDF storage
```

## Key Components

### 1. Flask Application (app.py)
- **Route Handlers**: Index page, contact form processing, resume download
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Form Validation**: Basic validation for contact form fields
- **File Serving**: Secure resume PDF download functionality

### 2. Template System
- **Base Template**: Provides common layout with navigation and footer
- **Index Template**: Single-page application with multiple sections
- **Responsive Design**: Mobile-first approach using Bootstrap grid

### 3. Frontend Features
- **Smooth Scrolling**: JavaScript-powered navigation between sections
- **Progress Bars**: Animated skill level indicators
- **Contact Form**: POST form with Flask flash messaging
- **Responsive Navigation**: Collapsible mobile menu

### 4. Content Sections
- Hero section with profile image and introduction
- About section with skills, education, and personal info
- Projects showcase with technology stacks
- Resume section with download functionality
- Certifications and education timeline
- Contact form for user inquiries

## Data Flow

### Request Processing
1. User navigates to website (GET /)
2. Flask renders index.html template with static content
3. JavaScript enhances user interactions (smooth scroll, animations)
4. Contact form submissions (POST /contact) are processed server-side
5. Resume downloads (GET /download-resume) serve static PDF files

### Contact Form Flow
1. User fills contact form and submits
2. Flask validates required fields (name, email, message)
3. Submission logged to application logs
4. Success/error message flashed to user
5. User redirected back to contact section

## External Dependencies

### Python Packages
- **Flask**: Web framework for routing and templating
- **Werkzeug**: WSGI utilities (ProxyFix middleware)

### Frontend Libraries (CDN)
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Inter font family for typography

### Static Assets
- Profile image: `/static/img/profile.png`
- Resume PDF: `/static/resume/SHUBHANKAR_PATEL.pdf`
- Custom CSS and JavaScript files

## Deployment Strategy

### Development Configuration
- Debug mode enabled for development
- Application runs on `0.0.0.0:5000` for accessibility
- Environment variable for session secret with development fallback
- Detailed logging for debugging purposes

### Production Considerations
- Session secret should be set via environment variable
- Debug mode should be disabled
- Consider using a proper WSGI server (Gunicorn, uWSGI)
- Static files could be served by web server (Nginx) for better performance
- SSL/HTTPS recommended for secure contact form submissions

### Scalability Notes
- Current architecture is suitable for a personal portfolio with low traffic
- Contact form currently logs to application logs - could be enhanced with email notifications or database storage
- No database required for current functionality - all content is static
- Could be easily deployed to platforms like Heroku, Railway, or traditional VPS