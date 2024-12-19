import { Transaction } from "@/services/apiService";

// TODO: Replace all any
export function toCamelCase(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

function isValidUrl(string: string) {
  try {
    new URL(string);

    return true;
  } catch (err) {
    return false;
  }
}

export function checkValueByType(dataType: string, value: string) {
  switch (dataType) {
    case "phoneNumber":
      return value.match("[0-9]{10}") != null;
    case "email":
      return validateEmail(value) != null;
    case "companyWebsiteUrl":
      return isValidUrl(value);
    default:
      return value.length > 0;
  }
}

interface ApiOptions extends RequestInit {
  body?: string;
}

export const apiCall = async <T>(
  url: string,
  options: ApiOptions = {},
): Promise<T> => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error("API Call Error:", (error as Error).message);
    throw error;
  }
};

export interface GroupedTransactions {
  created_at: string;
  transactions: Transaction[];
}

export const groupTransactionsByDate = (
  transactions: Transaction[],
): GroupedTransactions[] => {
  const grouped: { [date: string]: Transaction[] } = {};

  transactions.forEach((transaction) => {
    const date = transaction.created_at.toString().split("T")[0]; // Extract the date portion

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(transaction);
  });

  // Convert the grouped object into an array
  return Object.entries(grouped).map(([date, transactions]) => ({
    created_at: date,
    transactions,
  }));
};
