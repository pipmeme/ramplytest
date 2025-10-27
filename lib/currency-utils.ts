export interface Currency {
  code: string
  symbol: string
  name: string
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
]

const countryToCurrency: Record<string, string> = {
  US: "USD",
  GB: "GBP",
  IN: "INR",
  AU: "AUD",
  CA: "CAD",
  JP: "JPY",
  CN: "CNY",
  BR: "BRL",
  MX: "MXN",
  ZA: "ZAR",
  SG: "SGD",
  AE: "AED",
  SA: "SAR",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  IE: "EUR",
  GR: "EUR",
}

export async function detectUserCurrency(): Promise<string> {
  try {
    // Try IP geolocation first
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    const countryCode = data.country_code

    if (countryCode && countryToCurrency[countryCode]) {
      return countryToCurrency[countryCode]
    }
  } catch (error) {
    console.error("Failed to detect currency from IP:", error)
  }

  // Fallback to browser locale
  try {
    const locale = navigator.language || "en-US"
    const region = locale.split("-")[1]

    if (region && countryToCurrency[region]) {
      return countryToCurrency[region]
    }
  } catch (error) {
    console.error("Failed to detect currency from locale:", error)
  }

  // Default to USD
  return "USD"
}

export function getCurrencySymbol(code: string): string {
  return currencies.find((c) => c.code === code)?.symbol || "$"
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = currencies.find((c) => c.code === currencyCode)
  if (!currency) return `$${amount.toLocaleString()}`

  return `${currency.symbol}${amount.toLocaleString()}`
}
