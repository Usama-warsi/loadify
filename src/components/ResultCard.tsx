import { CheckCircle, XCircle, Download, FileText, RotateCcw } from "lucide-react";

interface ResultCardProps {
  result: {
    success: boolean;
    url?: string;
    download_url?: string;
    format?: string;
    message?: string;
    log?: string;
    error?: string;
  };
  mp3: boolean;
  onReset: () => void;
}

const ResultCard = ({ result, mp3, onReset }: ResultCardProps) => {
  return (
    <div className="neumorphic rounded-2xl p-8 animate-fade-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {result.success ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive" />
            )}
            <h3 className="text-lg font-semibold">
              {result.success ? "Download Ready" : "Download Failed"}
            </h3>
          </div>
          {result.success && result.format && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Format:</span>
              <span className="font-medium text-foreground">{result.format}</span>
            </div>
          )}
        </div>

        {result.success ? (
          <div className="space-y-6">
            {/* Media Preview */}
            {(result.url || result.download_url) && (
              <div className="rounded-xl p-4">
                {mp3 ? (
                  <audio
                    controls
                    controlsList="nodownload"
                    className="modern-audio-player"
                    src={result.url || result.download_url}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <video
                    controls
                    controlsList="nodownload"
                    className="w-full rounded-lg max-h-[400px] object-contain"
                    style={{ maxHeight: 400 }}
                    src={result.url || result.download_url}
                  >
                    Your browser does not support the video element.
                  </video>
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <a
                href={result.download_url || result.url || "#"}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 w-full md:w-auto neumorphic rounded-xl px-6 py-4 font-semibold text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Now
              </a>

              <button
                onClick={onReset}
                className="flex-1 w-full md:w-auto neumorphic-flat rounded-xl px-6 py-3 font-medium text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Get Another
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              {result.error || "An error occurred while processing your request."}
            </p>
            <p className="text-xs text-muted-foreground">
              Please check the URL and try again. Make sure the video is publicly accessible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
