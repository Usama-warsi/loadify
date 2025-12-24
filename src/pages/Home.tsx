import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoDownloadForm from "@/components/VideoDownloadForm";
import ContactForm from "@/components/ContactForm";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            {/* Hero Section */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Download Videos
                <br />
                <span className="text-muted-foreground">Instantly</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Fast, simple, and free. Download videos from your favorite platforms in seconds with Loadify.
              </p>
            </div>

            {/* Download Form */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <VideoDownloadForm />
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 pt-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="neumorphic-flat rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl neumorphic-inset flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Download videos in seconds with our optimized infrastructure
                </p>
              </div>

              <div className="neumorphic-flat rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl neumorphic-inset flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Your downloads are private and secure, we don't store any data
                </p>
              </div>

              <div className="neumorphic-flat rounded-2xl p-6 space-y-3">
                <div className="w-12 h-12 rounded-xl neumorphic-inset flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">Audio Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Extract MP3 audio from any video with just one click
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact section */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
