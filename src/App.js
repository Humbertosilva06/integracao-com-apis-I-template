import React, { useEffect, useState } from "react";
import AddUsuario from "./Componentes/AddUsuario/AddUsuario";
import Usuario from "./Componentes/Usuario/Usuario";
import axios from "axios";


//Aula 14

//OBS: problemas: a pagina não renderiza as informações, tem que dar um refresh (tentar descobrir o porque)


//pratica guiada - usaremos a api Labenusers (https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro)
//1.1 no template, os dados estão mocados, vindos de um array do proprio arquivo. Modifique o App.js para que ele receba o array  de usuarios pela API
//1.2 - IMPORTAR AXIOS ( ja tinha feito na main)
//1.3 primeiros faremos a requisição pegando todos os usuarios: com variaveis e depois direto

//PRATICA GUIADA 2
//2.1 agora que estmoas acessando a api, vamos criar uma funcao que recebea um paramteo e com isso retorne o email do usuario, para isso veja os endpoints e escolha o endpoint  que retoen esse dado. (faremos essa reuisição no componente Usuario)

// PRATICA GUIADA 3
//3.1 ADICIONAR USUARIO: ver na documentação quais dados necessarios para criar nvoo usuisario, crie os elementos e funçoes necessarios para sciocionar novo usuario (sera feito no componente adicionar usuario)

//  FIXAÇÃO
// 1 -modificar dados de um usuario
//fixação-1-a: procure na documentação qual endpoint  adequando para este caso e quais dados precisam ser enviados
//fixação-1-b: cire o input e funcao necessario para pega este valor dado pelo usuario
//fixação-1-c: cire a função que fa z arequisição no axios

// 2 - deletar usuario
// fixação 2-a: veja na documentação o endppoint de deletar ususario
// fixação 2-b: crie uma funcção que receba esses dados (e os elemtnos necessarios) e faça a função


const usuariosLocal = [
  {
    id: 1,
    name: "Muri"
  },
  {
    id: 2,
    name: "Paulinha"
  },
  {
    id: 3,
    name: "Marcelo"
  },
  {
    id: 4,
    name: "Rodrigo"
  },
]

function App() {
  const [usuarios, setUsuarios] = useState(usuariosLocal)
  //sintaxe do axios (axios.metodo (a url da api).then((response)=>{função callback}).catch((error)=>{função callback}))

  // o get pode receber 3 parametro: url, uma com o header (pode ser o autorizathioopn), e pode ter um  body. se tiver o body ele sempre é o segundo parametro (axios.get(url, body, config(onde vai o headers e etc)))
  // no caso o get da APi LAbenusers so pede url e headers autorizathion

  //1.3 (COM VARIAVIES) = criamos uma const para guardar a url  e uma para o headers (um objeto headers que tbm receb um obetjo{Authorizathin: "nome-sobrenome-turma"})

  // 1.3.1 se der certo, a requisiçãop fica em response, se acessarmos response com o console.log (veremos um obejto com o status e varias informações, e dentro tem uma outra coisa que é o data, nada mais que nosso array com os usuarios, portantos acesso o response.data para verificar diretamene o array de usuarios)
  //1.3.2 caso desse errada a requisição cairia no catch

  // colocamos dentro de um usereffect pq sempre que o estado ususarios atualizar apos a requisição, o componente renderiza de novo pois colocamos ele dentro de um estado e damos o settEstado e a requisição ocorre de novo, gerando um loop infinito, portanto colocamos num useEffect para que ele occora apenas uma vez após a montagem do componene (o componente renderiza, o useEffect chama a requisição uma unica vez
  //pode-e colocar direto no use effect:
  // useEffect(()=>{
  //   const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
  //   const config = {headers: {Authorization:"humberto-oliveira-turmaBarbosaB"}}

  //   axios.get(url, config)
  //   .then((response)=>{
  //     //3.1
  //     setUsuarios(response.data)})
  //   .catch((error)=>{})    
  // },[])
  //ou criar uma função, colocar a requisição dentro passando os paramentros e chama-la dentro do useeffect



  // função com a requisição para pegar os usuarios
  const getAllUsers = () => {
    //1.3
    const url = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
    const config = { headers: { Authorization: "humberto-oliveira-turmaBarbosaB" } }

    axios.get(url, config)
      .then((response) => {
        //1.3.1
        setUsuarios(response.data)
      })
      .catch((error) => {
        //1.3.2
      })

  }

  //use effect com a funcao de requisição
  useEffect(() => {
    getAllUsers()

  }, [])

  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>
      <AddUsuario />
      {usuarios.map((usuario) => {
        return <Usuario key={usuario.id} usuario={usuario} />
      })}
    </>
  )
}

export default App;
