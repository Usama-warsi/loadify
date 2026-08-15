export const onRequestPost = async (context) => {
    try {
        const { request, env } = context;
        const { name, email, phone, message, captchaToken } = await request.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // TODO: Verify captchaToken
        // TODO: Send email using a provider (e.g. Resend, SendGrid) API

        // WordPress API Configuration
        const wpUrl = "https://codrammer.com/wp-json/wp/v2/loadify-contact-form";
        const wpUsername = env.WP_USERNAME;
        const wpAppPassword = env.WP_APP_PASSWORD;
        if (!wpUsername || !wpAppPassword) {
            return new Response(JSON.stringify({ error: "Contact form is not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
        const auth = btoa(`${wpUsername}:${wpAppPassword}`);

        const wpBody = {
            title: name,
            status: "publish",
            acf: {
                name,
                email,
                phone,
                message
            }
        };

        const wpRes = await fetch(wpUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${auth}`
            },
            body: JSON.stringify(wpBody)
        });

        if (!wpRes.ok) {
            const errorText = await wpRes.text();
            console.error("WP API Error:", errorText);
            return new Response(JSON.stringify({ error: "Failed to save contact", details: errorText }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const wpData = await wpRes.json();
        return new Response(JSON.stringify({ success: true, data: wpData }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
