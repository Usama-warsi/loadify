import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="neumorphic rounded-2xl p-8 md:p-12 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Agreement to Terms</h2>
                  <p>
                    By accessing and using Loadify, you agree to be bound by these Terms and Conditions. 
                    If you do not agree with any part of these terms, you should not use our service.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Use of Service</h2>
                  <p>
                    Loadify provides a video downloading service. You agree to use this service only for 
                    lawful purposes and in accordance with these terms.
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>You must have the right to download the content you request</li>
                    <li>You will not use the service for any illegal activities</li>
                    <li>You will not attempt to circumvent any security measures</li>
                    <li>You will not abuse or overload our servers</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
                  <p>
                    You are responsible for ensuring you have the right to download any content through 
                    our service. We do not claim ownership of any content you download. You must respect 
                    copyright laws and terms of service of content platforms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Service Availability</h2>
                  <p>
                    We strive to provide reliable service, but we do not guarantee:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Uninterrupted access to the service</li>
                    <li>Error-free operation</li>
                    <li>Availability of specific videos or platforms</li>
                    <li>Specific download speeds or quality</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Disclaimer of Warranties</h2>
                  <p>
                    Loadify is provided "as is" without any warranties, express or implied. We disclaim 
                    all warranties including merchantability, fitness for a particular purpose, and 
                    non-infringement.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
                  <p>
                    To the maximum extent permitted by law, Loadify shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages resulting from your use of 
                    the service.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Prohibited Activities</h2>
                  <p>
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    <li>Download copyrighted content without permission</li>
                    <li>Use the service for commercial purposes without authorization</li>
                    <li>Attempt to reverse engineer or compromise the service</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Termination</h2>
                  <p>
                    We reserve the right to terminate or suspend your access to the service at any time, 
                    without prior notice, for any reason, including violation of these terms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Changes to Terms</h2>
                  <p>
                    We may modify these Terms and Conditions at any time. Your continued use of the 
                    service after changes constitutes acceptance of the modified terms.
                  </p>
                </section>

                <section className="space-y-3">
                  <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
                  <p>
                    For questions about these Terms and Conditions, please contact us through our 
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

export default Terms;
