import { ChatMessage, ImageSize } from "../types";

const API_URL = import.meta.env.VITE_API_URL || ''; // Allow relative path by default or environment specified URL

// Helper to ensure API key selection for paid models (kept for compatibility, though backend handles key)
export const ensureApiKey = async (): Promise<boolean> => {
  // If the backend handles the key, we don't need client-side key selection unless using a browser extension.
  // We can keep this as a no-op or check if the user *really* wanted client-side key.
  // Given the instruction to move to backend, we likely don't need this anymore.
  return true;
};

export const generateSmileSimulation = async (
  imageData: string,
  imageSize: ImageSize
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/simulate-smile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        prompt: "Quiero que me realices un diseno de sonrisa en porcelana, trabaja como el 0.1% de los mejores odontologos del mundo y que la imagen quede con las mejor calidad posible.",
        // We can pass imageSize if the backend supports it, but for now it's not used in the simple backend logic
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate simulation');
    }

    const result = await response.json();
    return result.image;
  } catch (error) {
    console.error("Simulation error:", error);
    throw error;
  }
};

export const sendChatMessage = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        message: newMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
};
