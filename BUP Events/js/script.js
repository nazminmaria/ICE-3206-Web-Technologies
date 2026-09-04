const eventsData = [
    {
        id: 1,
        title: "Circuit Clash 1.0",
        category: "Technology",
        club: "BUP Robotics Club",
        date: "15–16 November 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/circuit-clash.jpg",
        description: "Circuit Clash 1.0 was a national robotics and technology festival organized by BUP Robotics Club. The event featured robotics, cybersecurity, gaming and project-based competitions."
    },
    {
        id: 2,
        title: "BUP Techsurge & IEEE Branch Fest 2025",
        category: "Technology",
        club: "IEEE BUP Student Branch",
        date: "15–16 November 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/ieee-branch-fest.jpg",
        description: "BUP Techsurge and IEEE Branch Fest 2025 brought together technology enthusiasts through competitions, technical activities and innovation-focused events."
    },
    {
        id: 3,
        title: "BUP Techsurge 4.0",
        category: "Technology",
        club: "Department of ICT",
        date: "28 March 2026",
        location: "Bangladesh University of Professionals",
        image: "images/events/techsurge.jpg",
        description: "BUP Techsurge 4.0 was an ICT-focused technology event featuring activities designed to encourage technological knowledge, creativity and innovation among students."
    },
    {
        id: 4,
        title: "BUP CSE Tech Carnival 2025",
        category: "Technology",
        club: "BUP Computer Programming Club",
        date: "24–25 September 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/cse-tech-carnival.jpg",
        description: "BUP CSE Tech Carnival 2025 featured technology and programming-focused activities organized for students interested in computer science and technology."
    },
    {
        id: 5,
        title: "BUP Career & Education Fest 2026",
        category: "Career",
        club: "BUP Career Club",
        date: "17, 18 & 21 May 2026",
        location: "Bangladesh University of Professionals",
        image: "images/events/career-education-fest.jpg",
        description: "BUP Career and Education Fest 2026 connected students with organizations through company booths, seminars, networking opportunities and recruitment activities."
    },
    {
        id: 6,
        title: "Devthon 6.0",
        category: "Technology",
        club: "Development Leaders Club",
        date: "17–18 November 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/devthon.jpg",
        description: "Devthon 6.0 was organized by the Development Leaders Club as part of its student-focused development and innovation activities."
    },
    {
        id: 7,
        title: "BUP Lit Fest",
        category: "Cultural",
        club: "BUP Literature & Drama Club",
        date: "24–26 October 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/lit-fest.jpg",
        description: "BUP Lit Fest celebrated literature, creativity and student expression through literary and cultural activities."
    },
    {
        id: 8,
        title: "BUP National Moot Court 2025",
        category: "Academic",
        club: "BUP Law & Moot Court Club",
        date: "12–14 September 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/moot-court.jpg",
        description: "BUP National Moot Court 2025 provided participants with an opportunity to demonstrate legal research, argumentation and advocacy skills."
    },
    {
        id: 9,
        title: "POMAC 5.0",
        category: "Academic",
        club: "BUP Economics Club",
        date: "29–30 October 2025",
        location: "Bangladesh University of Professionals",
        image: "images/events/pomac.jpg",
        description: "POMAC 5.0 was an economics-focused event organized by the BUP Economics Club, bringing students together through academic and competitive activities."
    },
    {
        id: 10,
        title: "18th BUP Day Celebration",
        category: "University",
        club: "Bangladesh University of Professionals",
        date: "11 June 2026",
        location: "Bangladesh University of Professionals",
        image: "images/events/bup-day.jpg",
        description: "The 18th BUP Day Celebration marked an important occasion in the history of Bangladesh University of Professionals through university-wide celebrations and activities."
    }
];

function createEventCard(event) {
    return `
        <article class="event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>

            <div class="event-content">
                <span class="event-category">${event.category}</span>

                <h3>${event.title}</h3>

                <p class="event-date">📅 ${event.date}</p>

                <p class="event-club">${event.club}</p>

                <a href="event-details.html?id=${event.id}" class="event-btn">
                    View Details
                </a>
            </div>
        </article>
    `;
}

function loadFeaturedEvents() {
    const container = document.getElementById("featuredEvents");

    if (!container) {
        return;
    }

    container.innerHTML = eventsData
        .slice(0, 6)
        .map(createEventCard)
        .join("");
}

function loadAllEvents(events = eventsData) {
    const container = document.getElementById("eventsContainer");

    if (!container) {
        return;
    }

    if (events.length === 0) {
        container.innerHTML = `
            <div class="no-events">
                <h3>No events found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = events
        .map(createEventCard)
        .join("");
}

function searchEvents() {
    const searchInput = document.getElementById("eventSearch");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredEvents = eventsData.filter(event =>
        event.title.toLowerCase().includes(searchText) ||
        event.club.toLowerCase().includes(searchText) ||
        event.category.toLowerCase().includes(searchText)
    );

    loadAllEvents(filteredEvents);
}

function filterEvents(category) {
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {
        button.classList.remove("active");

        if (button.textContent.trim() === category) {
            button.classList.add("active");
        }
    });

    if (category === "All") {
        loadAllEvents(eventsData);
        return;
    }

    const filteredEvents = eventsData.filter(
        event => event.category === category
    );

    loadAllEvents(filteredEvents);
}

function loadEventDetails() {
    const container = document.getElementById("eventDetails");

    if (!container) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const eventId = parseInt(params.get("id"));

    const eventData = eventsData.find(event => event.id === eventId);

    if (!eventData) {
        container.innerHTML = `
            <div class="no-events">
                <h2>Event Not Found</h2>
                <p>The requested event could not be found.</p>
                <a href="events.html" class="btn btn-primary">
                    Back to Events
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="event-details-image">
            <img src="${eventData.image}" alt="${eventData.title}">
        </div>

        <div class="event-details-content">

            <span class="event-category">
                ${eventData.category}
            </span>

            <h1>${eventData.title}</h1>

            <div class="event-meta">
                <p><strong>Date:</strong> ${eventData.date}</p>
                <p><strong>Organized by:</strong> ${eventData.club}</p>
                <p><strong>Location:</strong> ${eventData.location}</p>
            </div>

            <div class="event-description">

                <h2>About the Event</h2>

                <p>${eventData.description}</p>

            </div>

            <a href="events.html" class="event-btn">
                ← Back to Events
            </a>

        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedEvents();
    loadAllEvents();
    loadEventDetails();
});