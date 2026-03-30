export const CATEGORIES = ['Academic', 'Placement', 'Events', 'Scholarships', 'Sports', 'Hostel', 'General'];

export const DUMMY_NOTICES = [
    {
        id: 'n_1',
        title: 'End Semester Final Exams Rescheduled',
        category: 'Academic',
        urgency: 'Urgent',
        desc: 'Due to unforeseen circumstances, the final exams scheduled for next week have been postponed by two days. Please check the updated schedule attached.',
        expiry: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        attachment: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=400',
        datePosted: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'n_2',
        title: 'Google Campus Placement Drive 2026',
        category: 'Placement',
        urgency: 'Important',
        desc: 'Google is visiting the campus for the Software Engineering role. All final year B.Tech students with CGPA > 8.0 are eligible to apply. Last date to register is Friday.',
        expiry: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        attachment: null,
        datePosted: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'n_3',
        title: 'Annual Tech Fest "Innovate 26" Registrations Open',
        category: 'Events',
        urgency: 'Normal',
        desc: 'Join the biggest tech fest of the year! Participate in hackathons, robotics, and coding challenges. Win prizes up to ₹1,000,000.',
        expiry: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        attachment: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
        datePosted: new Date().toISOString()
    },
    {
        id: 'n_4',
        title: 'Hostel Maintenance - Power Outage',
        category: 'Hostel',
        urgency: 'Important',
        desc: 'Scheduled maintenance will cause a power outage in Boys Hostel A from 2PM to 5PM tomorrow. Please plan accordingly.',
        expiry: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        attachment: null,
        datePosted: new Date().toISOString()
    },
    {
        id: 'n_5',
        title: 'Semester Registration Deadline (Closed)',
        category: 'Academic',
        urgency: 'Important',
        desc: 'Last day to register for the current semester courses. Late fees will apply hereafter.',
        expiry: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        attachment: null,
        datePosted: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
];
