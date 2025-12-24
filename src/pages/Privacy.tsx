import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="neumorphic rounded-2xl p-8 md:p-12 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
                  <p>
                    At Loadify, we take your privacy seriously. This Privacy Policy explains how we collect, 
                    use, and protect your information when you use our video downloading service.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
                  <p>
                    When you use Loadify, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Video URLs you submit for downloading</li>
                    <li>Basic usage data and analytics</li>
                    <li>Device information and browser type</li>
                    <li>IP address for security purposes</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
                  <p>
                    We use the collected information to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Process your video download requests</li>
                    <li>Improve our service and user experience</li>
                    <li>Monitor and prevent abuse or misuse</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Data Storage and Security</h2>
                  <p>
                    We do not store downloaded videos on our servers. Video URLs are processed temporarily 
                    and are not retained after the download is complete. We implement industry-standard 
                    security measures to protect your data.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Third-Party Services</h2>
                  <p>
                    Loadify may use third-party services for analytics and infrastructure. These services 
                    have their own privacy policies, and we encourage you to review them.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Access the information we have about you</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of data collection (where applicable)</li>
                    <li>Lodge a complaint with data protection authorities</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    significant changes by posting the new policy on this page with an updated revision date.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us through our 
                    support channels.
                  </p>
                </section>

                <p className="text-sm pt-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
