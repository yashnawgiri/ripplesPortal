import type { EngagementData } from "./../../types"
import axios from "axios"

export async function fetchInstagramProfile(username: string): Promise<EngagementData> {
  try {
    console.log("Fetching Instagram data for:", username)

    // Use the new API endpoint
    const apiUrl = `https://free-tools-function-app.azurewebsites.net/api/getInstagramEngagementRate?username=${username}`

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      timeout: 10000, // 10 second timeout
    })

    const data = response.data

    // Check if the API returned an error
    if (data.error) {
      console.error("API returned an error:", data.message)
      throw new Error(data.message)
    }

    // Return the data directly since it already matches our EngagementData type
    return data as EngagementData
  } catch (error) {
    console.error("Error fetching Instagram data:", error)

    // Check if it's an axios error with a response
    if (axios.isAxiosError(error) && error.response) {
      // Check for specific error messages
      if (error.response.status === 429) {
        throw new Error("Too many requests. Please try again later.")
      } else if (error.response.data?.error) {
        throw new Error(error.response.data.message || "Failed to fetch Instagram data")
      }
    }

    // For other errors, throw a generic error
    throw new Error("Failed to fetch Instagram data. Please try again later.")
  }
}
