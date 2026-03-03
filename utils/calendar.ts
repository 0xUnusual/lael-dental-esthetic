export const addToGoogleCalendar = (
    title: string,
    details: string,
    location: string = "Lael Dental Esthetic, Santo Domingo, Dominican Republic"
) => {
    // Create a default start time: Tomorrow at 9:00 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);

    // End time: 1 hour later
    const endTime = new Date(tomorrow);
    endTime.setHours(10, 0, 0, 0);

    // Format dates as YYYYMMDDTHHmmssZ (UTC) or local if using timezone, 
    // but simpler for google calendar render link is YYYYMMDDTHHmmss
    const formatTime = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const startStr = formatTime(tomorrow);
    const endStr = formatTime(endTime);

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.append("action", "TEMPLATE");
    url.searchParams.append("text", title);
    url.searchParams.append("details", details);
    url.searchParams.append("location", location);
    url.searchParams.append("dates", `${startStr}/${endStr}`);

    window.open(url.toString(), "_blank");
};
