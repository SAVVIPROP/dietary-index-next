"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2 style={{ marginBottom: "1rem" }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{
              padding: "0.5rem 1rem",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
