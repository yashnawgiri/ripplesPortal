import axios from "axios";

interface ReportFormData {
  name: string;
  email: string;
  organisation: string;
  username: string;
}

export async function submitReportRequest(formData: ReportFormData) {
  try {
    // Make the API call from the server
    const response = await axios.post(
      "https://free-tools-function-app.azurewebsites.net/api/captureERateCalculatorLead",
      {
        name: formData.name,
        email: formData.email,
        organisation: formData.organisation,
        username: formData.username,
        action: "both", // Always set to "both" as specified
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      },
    );

    const result = response.data;

    // Return the result to the client
    return {
      success: result.success,
      message: result.message || "Report request submitted successfully!",
      email_id: result.email_id,
      lead_id: result.lead_id,
    };
  } catch (error) {
    console.error("Error submitting report request:", error);

    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          success: false,
          message:
            error.response.data?.message ||
            "Server error. Please try again later.",
        };
      } else if (error.request) {
        // The request was made but no response was received
        return {
          success: false,
          message:
            "No response from server. Please check your internet connection and try again.",
        };
      } else {
        // Something happened in setting up the request
        return {
          success: false,
          message: `Request error: ${error.message}`,
        };
      }
    }

    // Generic error
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
