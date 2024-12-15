function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDiv = document.getElementById("result");

    // API publique pour les taux de change
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            resultDiv.innerHTML = "Error fetching conversion rates. Please try again.";
            console.error("API Error:", error);
        });
}
// Remplir les options au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
    await populateOptions();
});

// API pour devises classiques et cryptos
const CURRENCY_API = "https://api.exchangerate-api.com/v4/latest/USD";
const CRYPTO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

// Fonction pour remplir les options
async function populateOptions() {
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    try {
        // Récupérer les devises classiques
        const currencyResponse = await fetch(CURRENCY_API);
        const currencyData = await currencyResponse.json();

        // Ajouter les principales devises classiques
        const topFiat = ["USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD"];
        topFiat.forEach((currency) => {
            fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
            toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
        });

        // Récupérer les cryptos
        const cryptoResponse = await fetch(CRYPTO_API);
        const cryptoData = await cryptoResponse.json();

        cryptoData.forEach((crypto) => {
            const symbol = crypto.symbol.toUpperCase();
            const name = crypto.name;
            fromSelect.innerHTML += `<option value="${symbol}">${name} (${symbol})</option>`;
            toSelect.innerHTML += `<option value="${symbol}">${name} (${symbol})</option>`;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fonction de conversion
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultDiv = document.getElementById("result");

    if (amount === "" || isNaN(amount)) {
        resultDiv.innerHTML = "Please enter a valid amount.";
        return;
    }

    try {
        // Vérifier si on convertit entre deux cryptos ou fiat
        if (fromCurrency && toCurrency) {
            const ratesResponse = await fetch(CURRENCY_API);
            const ratesData = await ratesResponse.json();

            if (ratesData.rates[toCurrency]) {
                const rate = ratesData.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                resultDiv.innerHTML = "Conversion not supported.";
            }
        }
    } catch (error) {
        resultDiv.innerHTML = "Error during conversion.";
        console.error(error);
    }
}

