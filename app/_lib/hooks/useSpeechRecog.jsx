import { showCustomToast } from "@/app/_components/ui/Notification";
import { useEffect, useState, useRef } from "react";

const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null); // Adding state for error
  const recognitionRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    showCustomToast("Recording started..."); // Changed message for start
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      const { transcript } = event.results[event.results.length - 1][0];
      setTranscript(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        setError("Permission denied or service is not available.");
      } else {
        setError("An error occurred during speech recognition.");
      }
      setIsRecording(false);
      showCustomToast("Please enable microphone access."); // Changed error message
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      showCustomToast("Recording stopped."); // Changed message for stop
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { transcript, isRecording, toggleRecording, error };
};

export default useSpeechRecognition;
