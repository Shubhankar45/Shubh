import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

@app.route('/')
def index():
    """Main portfolio page with all sections"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Validate form data
        if not name or not email or not message:
            flash('Please fill in all fields.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Log contact form submission (in production, you might send email or save to database)
        app.logger.info(f"Contact form submission from {name} ({email}): {message}")
        
        flash('Thank you for your message! I will get back to you soon.', 'success')
        return redirect(url_for('index') + '#contact')
        
    except Exception as e:
        app.logger.error(f"Error processing contact form: {e}")
        flash('Sorry, there was an error sending your message. Please try again.', 'error')
        return redirect(url_for('index') + '#contact')

@app.route('/download-resume')
def download_resume():
    """Serve resume PDF for download"""
    try:
        return send_from_directory('static/resume', 'SHUBHANKAR_PATEL.pdf', as_attachment=True)
    except FileNotFoundError:
        flash('Resume file not found. Please contact me directly.', 'error')
        return redirect(url_for('index') + '#resume')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
