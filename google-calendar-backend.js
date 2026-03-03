/**
 * Google Apps Script for Lael Dental Appointment System
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project.
 * 3. Paste this code into Code.gs.
 * 4. Save the project.
 * 5. Click "Deploy" -> "New Deployment".
 * 6. Select type: "Web App".
 * 7. Description: "Lael Dental API".
 * 8. Execute as: "Me" (your Google account).
 * 9. Who has access: "Anyone" (so the website can call it).
 * 10. Click "Deploy" and copy the "Web App URL".
 * 11. Add this URL to your project's .env.local file as VITE_GOOGLE_SCRIPT_URL.
 */

// Configuration
// Replace with your specific calendar ID if not using the primary one
const CALENDAR_ID = 'primary';

function doGet(e) {
    // Handle CORS for GET requests
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'API is running' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const data = JSON.parse(e.postData.contents);
        const { action, appointment } = data;

        if (action === 'check_availability') {
            return checkAvailability(appointment.date);
        }

        if (action === 'create_appointment') {
            return createAppointment(appointment);
        }

        return response({ status: 'error', message: 'Invalid action' });

    } catch (error) {
        return response({ status: 'error', message: error.toString() });
    } finally {
        lock.releaseLock();
    }
}

function checkAvailability(dateStr) {
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    // Parse date string (YYYY-MM-DD)
    const date = new Date(dateStr);
    const startTime = new Date(date);
    startTime.setHours(9, 0, 0, 0); // 9 AM
    const endTime = new Date(date);
    endTime.setHours(17, 0, 0, 0); // 5 PM

    const events = calendar.getEvents(startTime, endTime);
    const busySlots = events.map(event => ({
        start: event.getStartTime().toISOString(),
        end: event.getEndTime().toISOString()
    }));

    return response({ status: 'success', busySlots: busySlots });
}

function createAppointment(data) {
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    const { name, email, phone, type, date, time } = data;

    const startTime = new Date(time);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1); // 1 hour duration

    // Check if slot is still free (double check)
    const conflicts = calendar.getEvents(startTime, endTime);
    if (conflicts.length > 0) {
        return response({ status: 'error', message: 'Time slot no longer available' });
    }

    const title = `[${type.toUpperCase()}] ${name}`;
    const description = `
    Paciente: ${name}
    Email: ${email}
    Teléfono: ${phone}
    Tipo de Cita: ${type}
    
    Reservado desde la web.
  `;

    const event = calendar.createEvent(title, startTime, endTime, {
        description: description,
        location: 'Lael Dental Esthetic'
    });

    // Optional: Send email to doctor or patient using MailApp
    // MailApp.sendEmail({ ... });

    return response({
        status: 'success',
        eventId: event.getId(),
        link: event.getHtmlLink()
    });
}

function response(data) {
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
}
