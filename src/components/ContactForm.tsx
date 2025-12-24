import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Google reCAPTCHA v3 site key (public)
  const RECAPTCHA_SITE_KEY = "6Ld0ZA4sAAAAAHk2cjbOErapgA6lnl9dkaNlXrC8";

  useEffect(() => {
    // Inject the reCAPTCHA v3 script with render=site_key
    if (!(window as any).grecaptcha) {
      const existing = document.querySelector(`script[src*="recaptcha"]`);
      if (!existing) {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill name, email and message");
      return;
    }

    setLoading(true);
    try {
      // Obtain reCAPTCHA v3 token (if grecaptcha is available)
      let captchaToken: string | null = null;
      if ((window as any).grecaptcha && RECAPTCHA_SITE_KEY) {
        try {
          await (window as any).grecaptcha.ready();
          captchaToken = await (window as any).grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' });
        } catch (err) {
          console.warn('reCAPTCHA execute failed', err);
        }
      }

      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, captchaToken }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Message sent — thank you!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        console.error("Contact error:", data);
        toast.error(data?.error || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error — try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto neumorphic rounded-2xl p-8">
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full px-4 py-3 rounded-md neumorphic-inset"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <input
            className="w-full px-4 py-3 rounded-md neumorphic-inset"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <input
          className="w-full px-4 py-3 rounded-md neumorphic-inset"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />

        <textarea
          className="w-full px-4 py-3 rounded-md neumorphic-inset h-28"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className="neumorphic rounded-md px-6 py-3 font-medium w-full md:w-auto"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
