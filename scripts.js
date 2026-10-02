class Parquimetro {
    #valorPago;

    // Tabela de tarifas (em ordem crescente de valor)
    #tarifas = [
        { valor: 1.00, tempo: 30 },
        { valor: 1.75, tempo: 60 },
        { valor: 3.00, tempo: 120 }
    ];

    constructor(valorPago) {
        this.#valorPago = valorPago;
    }

    calcular() {
        const valorMinimo = this.#tarifas[0].valor;

        if (this.#valorPago < valorMinimo) {
            return {
                suficiente: false,
                mensagem: `Valor insuficiente. O valor mínimo é R$ ${valorMinimo.toFixed(2).replace(".", ",")}.`
            };
        }

        // Escolhe a maior tarifa que pode ser paga com o valor informado
        let tarifaEscolhida = this.#tarifas[0];

        for (const tarifa of this.#tarifas) {
            if (this.#valorPago >= tarifa.valor) {
                tarifaEscolhida = tarifa;
            }
        }

        // Troco = valor pago - tarifa da faixa escolhida
        const troco = this.#valorPago - tarifaEscolhida.valor;

        return {
            suficiente: true,
            tempo: tarifaEscolhida.tempo,
            valorTarifa: tarifaEscolhida.valor,
            troco: Math.round(troco * 100) / 100
        };
    }
}

const form = document.getElementById("parquimetroForm");
const inputValor = document.getElementById("valor");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valor = Number(inputValor.value);

    if (Number.isNaN(valor) || valor < 0) {
        resultado.innerHTML = `
            <p class="erro">Digite um valor válido.</p>
        `;
        return;
    }

    const parquimetro = new Parquimetro(valor);
    const resultadoCalculo = parquimetro.calcular();

    if (!resultadoCalculo.suficiente) {
        resultado.innerHTML = `
            <p class="erro">${resultadoCalculo.mensagem}</p>
        `;
        return;
    }

    resultado.innerHTML = `
        <h2>Resultado</h2>
        <p><strong>Tempo:</strong> ${resultadoCalculo.tempo} minutos</p>
        <p><strong>Tarifa:</strong> R$ ${resultadoCalculo.valorTarifa.toFixed(2).replace(".", ",")}</p>
        <p><strong>Troco:</strong> R$ ${resultadoCalculo.troco.toFixed(2).replace(".", ",")}</p>
    `;
});
