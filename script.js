// Cotação de hoje.
const USD = 5.58
const EUR = 6.10
const GBP = 7.29

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Evento de submit do form.

form.addEventListener("submit", (event) => {
    event.preventDefault()

    // console.log(currency.value) // Exibe o valor de currency (moeda escolhida).

    switch(currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
})

// Função de conversão.
function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}` // Exibindo a cotação atualizada na descrição.

        let total = amount * price // Calcula o total.

        // Verifica se o input não é um número.
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        total = formatCurrencyBRL(total).replace("R$", "") // Formata o valor total.
        result.textContent = `${total} Reais` // Exibe o resultado total.

        footer.classList.add("show-result") // Aplica a classe estilizada em css.
    } catch (error) {
        console.log(error)
        footer.classList.remove("show-result") // Remove a classe.
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Formata a moeda em Real.

function formatCurrencyBRL(value){ 
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}