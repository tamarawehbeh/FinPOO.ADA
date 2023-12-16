const contas = []
let numeroConta = 0

class Cliente{
    constructor(nome, email, cpf){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
    }
}

class Conta{
    constructor(cliente, saldo, numeroConta){
        this.cliente = cliente;
        this.saldo = saldo;
        this.numeroConta = numeroConta;
    }
}

function atualizar(conta, numeroConta) {
    const trsArr = document.querySelectorAll("tr")
    for (let i = 0; i < trsArr.length; i++) {
        if (trsArr[i].lastChild.textContent == numeroConta) {
            trsArr[i].children[1].innerText = `R$${conta.saldo}`
            break
        }
    }
}


function criarConta(event) {
    const nome = prompt("Digite seu nome: ")
    const email = prompt("Digite seu email: ")
    const cpf = prompt("Digite seu cpf: ")
    numeroConta++

    if (!nome){
        alert("O campo nome é obrigatório!")
        return
    }
    if (!email){
        alert("O campo email é obrigatório!")
        return
    }
    if (!cpf){
        alert("O campo cpf é obrigatório!")
        return
    }

    const pessoa1 = new Cliente(nome, email, cpf)
    const conta1 = new Conta(pessoa1, 0, numeroConta);
    contas.push(conta1)
    const tabela = document.querySelector("table")

    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    td1.innerText = `${conta1.cliente.nome}`
    td2.innerText = `R$${conta1.saldo}`
    td3.innerText = `${conta1.numeroConta}`
    tabela.appendChild(tr)
    return conta1
}

const criarContaBtn = document.querySelector(".criar-conta")
criarContaBtn.addEventListener("click", criarConta)

function depositar(event){
    const numContUsuario = Number(prompt("Digite numero da conta: "))
    const deposito = Number(prompt("Valor do deposito: "))
    let contaEncontrada = false
    let conta = undefined
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].numeroConta === numContUsuario) {
            contaEncontrada = true
            contas[i].saldo += deposito
            conta = contas[i]
            break
        }
    }
    if (!contaEncontrada){
        alert("Conta não encontrada!")

    }else if(deposito < 0){
        alert("Não é possível depositar valor negativo!")
    }
    
    else {
        atualizar(conta, numContUsuario)
    }
}

function sacar(){
    const numContUsuario = Number(prompt("Digite numero da conta: "))
    const saque = Number(prompt("Valor do saque: "))
    let contaEncontrada = false
    let conta = undefined
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].numeroConta === numContUsuario) {
            contaEncontrada = true
            contas[i].saldo -= saque
            conta = contas[i]
            break
        }
    }
    if (!contaEncontrada){
        alert("Conta não encontrada!")

    } else if(saque < 0){
        alert("Não é possível sacar valor negativo!")
    
    }else if(saque > conta.saldo){
        alert("Saldo insuficiente!")
    }
    
    else {
        atualizar(conta, numContUsuario)
    }
}

function transferencia(){
    const numContFrom = Number(prompt("Digite numero da conta: "));
    const valorTransferido = Number(prompt("Valor da transferência: "));
    const numContTo = Number(prompt("Digite numero da conta: "));

    let contaFrom = undefined, contaTo = undefined
    let indexContaFrom = undefined, indexContaTo = undefined
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].numeroConta === numContFrom) {
            contaFrom = contas[i]
            indexContaFrom = i
        }
        if (contas[i].numeroConta === numContTo) {
            contaTo = contas[i]
            indexContaTo = i
        }
    }
    if (contaFrom === undefined && contaTo === undefined) {
        alert("Nenhuma das contas foi encotrada.")
    } else if (contaFrom === undefined){
        alert("A primeira conta não foi encontrada.")
    } else if (contaTo === undefined){
        alert("A segunda conta não foi encontrada.")
    } else if(valorTransferido < 0) {
        alert("Não é possivel transferir um valor negativo")
    } else {
        if (valorTransferido > contas[indexContaFrom].saldo){
            alert("Saldo insuficiente")
        } else {
            contas[indexContaFrom].saldo -= valorTransferido
            contas[indexContaTo].saldo += valorTransferido
            atualizar(contaFrom, numContFrom)
            atualizar(contaTo, numContTo)
        }
    }
}

const depositarBtn = document.querySelector(".depositar")
depositarBtn.addEventListener("click", depositar)

const saqueBtn = document.querySelector(".saque")
saqueBtn.addEventListener("click", sacar)

const transferirBtn = document.querySelector(".transferir")
transferirBtn.addEventListener("click", transferencia)

