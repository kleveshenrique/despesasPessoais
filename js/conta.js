class Conta{
    constructor(data,desc,tipo,valor){
        this.data = data;
        this.desc = desc;
        this.tipo = tipo;
        this.valor = valor;
    }
};

class GerenteConta {
    constructor(){
        this.arrReceitas = [];
        this.arrDespesas = [];
        this.arrTudo = [];
    }
    cadastrar(conta){
        if(conta.tipo=="R"){
            this.arrReceitas.push(conta);
        }else if (conta.tipo=="D") {
            this.arrDespesas.push(conta);
        }
    }
    obterSomaReceitas(){
        let totalReceitas = 0;
        this.arrReceitas.forEach(dado => {
            totalReceitas += dado.valor;
        });
        return totalReceitas;
    }
    obterSomaDespesas(){
        let totalDespesas = 0;
        this.arrDespesas.forEach(dado => {
            totalDespesas += dado.valor;
        });
        return totalDespesas;
    }
    obterSaldoTotal(){
        let saldoTotal = 0;
        arrTudo = arrReceitas.concat(arrDespesas);
        arrTudo.forEach(dado => {
            saldoTotal+=dado.valor;
        });
        return saldoTotal;
    }   
    
    
};

class ControllerConta {
    constructor(){
        this.gerenteConta = new GerenteConta();
    }
    lerDados(){
        let data  = document.getElementById("data").value;
        let desc  = document.getElementById("desc").value;
        let tipo  = document.getElementById("tipo").value;
        let strValor = (document.getElementById("valor").value).replace(",",".");
        let valor = parseFloat(strValor);
        let conta = new Conta(data,desc,tipo,valor);
        return conta;
    }
    exibirMensagem(strDados){
        document.getElementById("tabResultado").innerHTML = strDados;

    }   

    limparCampos(){
        document.getElementById("data").value="";
        document.getElementById("desc").value="";
        document.getElementById("valor").value="";
    }

    cadastrar(){
        let conta = this.lerDados();

        if (conta.data==""||conta.desc==""||isNaN(conta.valor)||conta.valor==0) {
            alert("Todos os campos são obrigatórios");
            return false;
        }        
        this.gerenteConta.cadastrar(conta);
        alert("Conta cadastrada com sucesso");
       //console.log(conta);
       document.getElementById("btnExtrato").disabled = false;
       this.limparCampos();
    }

    listarDados(valEntSaida){
        let operacao = [];
        var titulo="";
        let soma = 0;
        let somaEnt = 0;
        let somaSaida=0;
        if (valEntSaida=="saida") {
            operacao=this.gerenteConta.arrDespesas;
            titulo = "Valores das Despesas ";
            soma = this.gerenteConta.obterSomaDespesas();
        }else if (valEntSaida=="entrada") {
            operacao=this.gerenteConta.arrReceitas;
            titulo = "Valores das Receitas ";
            soma = this.gerenteConta.obterSomaReceitas();
        }else if (valEntSaida=="tudo") {
            operacao = this.gerenteConta.arrReceitas.concat(this.gerenteConta.arrDespesas);
            //console.log(operacao);
            titulo = "Receitas e Despesas"
            somaEnt=this.gerenteConta.obterSomaReceitas();
            somaSaida=this.gerenteConta.obterSomaDespesas();
            soma = somaEnt - somaSaida;
        }
        
        let strDivResultado="";
        let strLinhas = "";
        
           
        let contTotal = operacao.length;
        let cont = 1;
        
        
        //console.log(total);
        
        operacao.forEach(dado => {           
            if(dado.tipo=="D"){
                strLinhas += `
            
                    <tr class ="text-danger text-center">
                        <td>${dado.data}</td>
                        <td>${dado.desc}</td>
                        <td>${dado.tipo}</td>
                        <td>${dado.valor}</td>                    
                    </tr>
            
                `    
            }else{
                strLinhas += `
                
                <tr class="text-success text-center">
                    <td>${dado.data}</td>
                    <td>${dado.desc}</td>
                    <td>${dado.tipo}</td>
                    <td>${dado.valor}</td>                    
                </tr>
                
                `
            }
            if(cont==contTotal && valEntSaida=="tudo" ){
                strLinhas += `
            
            <tr class="text-center text-success">
                <td colspan='3' ><center><b>Total Receitas</b><center></td><td><b>${somaEnt}</b></td>               
            </tr>
            <tr class="text-center text-danger">
                <td colspan='3' ><center><b>Total Despesas</b><center></td><td><b>${somaSaida}</b></td>
            </tr>
            <tr class="text-center">
                
                <td colspan='3' ><center><b>Saldo Total </b><center></td><td><b>${soma}</b></td>
              
            </tr>
            
            `      
            }else if(cont==contTotal && valEntSaida !="tudo"){
                strLinhas += `
            
            <tr class="text-center">
                <td colspan='3' ><center><b>Saldo Total </b><center></td><td><b>${soma}</b></td>                    
            </tr>
            
            `    
            }
            cont++;
        });

        strDivResultado = `
        <div class="container center col-md-8 col-sm-12 mt-3"> 
            <div class="row">               
                <div class=" form-group col- col-sm-12 ">
                    <button class="btn btn-primary p-1" onclick="controller.mostrarExtrato('telaCad')">Novo</button>
                    <button class="btn btn-primary p-1" onclick="controller.listarDados('entrada')">Receitas</button>
                    <button class="btn btn-primary p-1" onclick="controller.listarDados('saida')">Despesas</button>
                    <button class="btn btn-primary p-1" onclick="controller.listarDados('tudo')">Tudo</button>                                
                </div>         
            </div> 
            <hr> 
            <table class="table table-striped table-bordered bt-0,5" id="tabela">
                <tr class="text-success text-center">
                    <td colspan='4'><b>${titulo}</b></td>                    
                </tr>
                <tr class="table-primary text-center">
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                </tr>
                <tb id="linhas">
                    `+
                    strLinhas
                    +`
                    
                </tb>

            </table>
            

        </div>
        `;
        
        
        
        //document.querySelector('#linhas').innerHTML = strLinhas;
        if (this.gerenteConta.arrReceitas.length>0 || this.gerenteConta.arrDespesas.length>0) {
            document.getElementById("tabResultado").innerHTML = strDivResultado;    
        }

         
                    
    };

    mostrarExtrato(divEnt){
        var display = document.getElementById(divEnt).style.display;;         
        if(display == "none"){
            document.getElementById(divEnt).style.display = 'block';
            document.getElementById("tabResultado").style.display = 'none';
        }else {
            document.getElementById(divEnt).style.display = 'none';
            document.getElementById("tabResultado").style.display = 'block';
            controller.listarDados("tudo");
        }
            
    };
};




var controller = new ControllerConta();
