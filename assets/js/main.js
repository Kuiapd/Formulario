
const input = Object.freeze({
    CPF : 2,
    USUARIO:3,
    SENHA : 4,
    VSENHA : 5
});

class ValidaForm{
    constructor(){
        this.cpfs = new Array();
        this.flagValida = true;
        this.erros = new Array();
        this.form = document.querySelector('.formulario');
        this.eventos();

    }

    eventos(){
        this.form.addEventListener('submit',(e)=>{
                this.handleSubmit(e);
            }      
        );
    }

    handleSubmit(e){
        e.preventDefault();
        let cpf = this.checkCampos();
        if(this.flagValida){
            this.cpfs.push(cpf);
            this.deletaTabela();
            this.criaTabela();
            this.form.reset();
            console.log('form enviado');
        }else{
            console.log('form não enviado');
            this.criarErros();
        }
    }

    checkCampos(){
        this.deletaErros();
        let campos = document.querySelectorAll('input');

        this.checkCamposVazios(campos);
        this.checkUsuario(campos[input.USUARIO].value);
        this.checkCPF(campos[input.CPF].value);
        this.checkSenha(campos[input.SENHA].value,campos[input.VSENHA].value);
        return {
            nome:campos[0].value,
            sobrenome:campos[1].value,
            usuario:campos[3].value,
            cpf:campos[2].value,
            senha:campos[4].value
        };
    }

    checkCamposVazios(campos){
        campos.forEach(campo=>{
            if(campo.value==''){
                console.log(campo.value,'dsaas')
                this.erros.push(`Campo ${campo.name}:não pode estar vazio.`)
                this.flagValida=false;
            }
        });
    }
    checkUsuario(user){
            
        if (user.length>12||user.length<3){
            this.erros.push('Campo usário:Precisa ter entre 3 e 12 caracteres');
            this.flagValida=false;
        }

        if(!/^[a-zA-Z0-9]+$/.test(user)){
            this.erros.push('Campo usuário: só pode conter letras e números');
            this.flagValida = false;
        }
    }

    checkCPF(cpf){
        let confereCPF =  new ValidaCPF(cpf);
        if(!confereCPF.valida()){
            this.flagValida = false;
            this.erros.push('Campo CPF: inválido.');
        }
    }

    checkSenha(senha,vsenha){
        if(senha.length<6||senha.length>12){
            this.erros.push('senha deve ter entre 6 e 12 caracteres')
            this.flagValida=false;
        }
        if(senha!=vsenha){
            this.flagValida=false;
            this.erros.push('senha e digite senha novamente são diferentes')
        }
    }

    criarErros(){
        const listaDeErros = document.querySelector('.erros');
        this.erros.forEach(erro=>{
            const itemErro = document.createElement('li');
            itemErro.classList.add('vermelho')
            itemErro.innerText = erro;
            listaDeErros.appendChild(itemErro);
        });
    }

    deletaErros(){
        const listaDeErros = document.querySelector('.erros');
        listaDeErros.innerHTML='';
        this.erros.length = 0;
        this.flagValida=true;
    }

    criaTabela(){
        const campos = ["nome","sobrenome", "usuario","cpf","senha"];
        const lista = document.querySelector('.listausers');
        const tabela = document.createElement('table');
        const cabeca = document.createElement('thead');
        const corpo = document.createElement('thead');
        const rodape = document.createElement('tfoot');
        const linhaCabeca = document.createElement('tr');
        const elemDescr = document.createElement('td');
        const linhaRodape = document.createElement('tr')
        lista.appendChild(tabela);
        tabela.appendChild(cabeca);
        tabela.appendChild(corpo);
        tabela.appendChild(rodape);
        //construindo cabecalho
        campos.forEach(campo=>{
            const elemCabeca = document.createElement('th');
            elemCabeca.innerText=campo;
            linhaCabeca.appendChild(elemCabeca);
        });
        cabeca.appendChild(linhaCabeca);

        //inseridos céluas de dados
        this.cpfs.forEach(campo=>{
            const linhaCorpo = document.createElement('tr');
            Object.values(campo).forEach(dados=>{
                const elemDados = document.createElement('td');
                elemDados.innerText=dados;
                linhaCorpo.appendChild(elemDados);
            });
            corpo.appendChild(linhaCorpo);
        });
        //inserindo rodapé
        elemDescr.innerText='Total'+cpfs.length+'usuários';
        linhaRodape.appendChild(elemDescr)
        rodape.appendChild(linhaRodape);
        
    }

    deletaTabela(){
        const listaUser = document.querySelector('.listausers');
        listaUser.innerHTML='';
    }
}


const valida  = new ValidaForm();