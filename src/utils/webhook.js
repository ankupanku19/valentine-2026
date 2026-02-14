// REPLACE THIS WITH YOUR ACTUAL DISCORD WEBHOOK URL
const WEBHOOK_URL = "https://discord.com/api/webhooks/1472238619388543160/rbzUKRvI-MX8u1G4RRluGJv0UTNFoSd12OUCdCM7aNL7eS8OI1h1q4KKaX0Y26EI6KmI";

export const sendActivity = async (title, description) => {
    if (!WEBHOOK_URL || WEBHOOK_URL.includes("YOUR_DISCORD")) {
        console.warn("Tracking skipped: No Webhook URL set.");
        return;
    }

    const payload = {
        username: "Valentine Tracker",
        avatar_url: "https://cdn-icons-png.flaticon.com/512/2904/2904973.png", // Heart icon
        embeds: [
            {
                title: title,
                description: description,
                color: 15158332, // Pink/Red color
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Failed to send tracking:", error);
    }
};
