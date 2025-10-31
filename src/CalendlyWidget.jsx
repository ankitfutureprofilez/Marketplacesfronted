import { InlineWidget } from "react-calendly";

export default function CalendlyWidget() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-5xl">
        <InlineWidget
          url="https://calendly.com/bailey-test-account/15min"
          styles={{ height: "700px", width: "100%" }}
          pageSettings={{
            backgroundColor: "#000000",
            primaryColor: "00a2ff",
            textColor: "ffffff",
          }}
        />
      </div>
    </div>
  );
}
