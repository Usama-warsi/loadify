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

        const slackWebhookUrl = env.SLACK_WEBHOOK_URL;
        if (!slackWebhookUrl) {
            return new Response(JSON.stringify({ error: "Contact form is not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const slackBody = {
            blocks: [
                {
                    type: "header",
                    text: { type: "plain_text", text: "New Loadify Contact Form Submission" },
                },
                {
                    type: "section",
                    fields: [
                        { type: "mrkdwn", text: `*Name:*\n${name}` },
                        { type: "mrkdwn", text: `*Email:*\n${email}` },
                        { type: "mrkdwn", text: `*Phone:*\n${phone || "-"}` },
                    ],
                },
                {
                    type: "section",
                    text: { type: "mrkdwn", text: `*Message:*\n${message}` },
                },
            ],
        };

        const slackRes = await fetch(slackWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackBody),
        });

        if (!slackRes.ok) {
            const errorText = await slackRes.text();
            console.error("Slack webhook error:", errorText);
            return new Response(JSON.stringify({ error: "Failed to send message" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
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
