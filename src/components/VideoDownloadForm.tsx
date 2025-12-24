import { useState, useEffect, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import ResultCard from "./ResultCard";

interface DownloadResult {
  success: boolean;
  url?: string;
  download_url?: string;
  format?: string;
  message?: string;
  log?: string;
  error?: string;
}

const VideoDownloadForm = () => {
  const [url, setUrl] = useState("");
  const [mp3, setMp3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const progressInterval = useRef<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    setLoading(true);
    // start progress animation
    setProgress(5);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    progressInterval.current = window.setInterval(() => {
      setProgress((p) => {
        const next = p + Math.floor(Math.random() * 6) + 1;
        return next >= 95 ? 95 : next;
      });
    }, 400);
    setResult(null);

    try {
      const response = await fetch("https://downloader.seositechecker.pro/api/download", {
        method: "POST",
        headers: {
          Authorization: "Bearer c42b70c65f64e53088baac5f85a78bbf27743d1c",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          mp3: mp3,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      if (response.ok) {
        console.log("Download successful, setting result:", data);
        setResult({
          success: true,
          ...data,
        });
        toast.success("Video ready to download!");
      } else {
        console.error("API Error:", data);
        setResult({
          success: false,
          error: data.message || "Failed to process the video",
        });
        toast.error(data.message || "Failed to process the video");
      }
    } catch (error) {
      console.error("Download error:", error);
      console.error("Error details:", error);
      setResult({
        success: false,
        error: "Network error. Please try again.",
      });
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
      // stop progress and finish
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
      setProgress(100);
      // reset progress after a short delay so UI can update
      setTimeout(() => setProgress(0), 800);
    }
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    };
  }, []);

  const handleReset = () => {
    setUrl("");
    setMp3(false);
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="neumorphic rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-3">
                Video URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste video URL here"
                className="w-full px-6 py-4 rounded-xl neumorphic-inset bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="mp3"
                type="checkbox"
                checked={mp3}
                onChange={() => setMp3(!mp3)}
                className="sr-only"
                disabled={loading}
              />

              <button
                type="button"
                onClick={() => setMp3(!mp3)}
                aria-pressed={mp3}
                className={`neumorphic-flat w-6 h-6 rounded-md transition-all ${
                  mp3 ? "bg-primary" : ""
                }`}
                disabled={loading}
              >
                {mp3 && (
                  <svg
                    className="w-4 h-4 text-primary-foreground mx-auto"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </button>

              <label htmlFor="mp3" className="text-sm font-medium cursor-pointer select-none">
                Extract MP3 audio only
              </label>
            </div>
          </div>
        </div>

        {!result && (
          <button
            type="submit"
            disabled={loading}
            className="w-full neumorphic rounded-xl px-8 py-4 font-medium text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Downloading...</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>

                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${progress}%`, transition: "width 300ms ease" }}
                  />
                </div>
              </div>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Video
              </>
            )}
          </button>
        )}
      </form>

      {result && <ResultCard result={result} mp3={mp3} onReset={handleReset} />}
    </div>
  );
};

export default VideoDownloadForm;

