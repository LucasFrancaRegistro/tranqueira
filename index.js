async function connect(){
  if(global.connection && global.connection.state !== "disconnected")
  return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:admin@localhost:3306/cadastro");
  global.connection = connection;
  return connection;
}

async function insert_fun(nome,email,cpf,nas_data,tel_fixo,tel_celular,cep,numero,rua,bairro,cidade,estado,complemento){
  const con = await connect();
  con.query(`insert into funcionario(nome,email,cpf,nas_data,tel_fixo,tel_celular,cep,numero,rua,bairro,cidade,estado,complemento)
  values ('${nome}','${email}','${cpf}','${nas_data}','${tel_fixo}','${tel_celular}','${cep}','${numero}','${rua}','${bairro}','${cidade}','${estado}','${complemento}');`)
  permissao = true
}

async function insert_esc(escolas,cpf){
  for (k in escolas){
    const escola = escolas[k].escolas.toUpperCase()
    const con = await connect();
    var [rows] = await con.query(`select esc_cod from escolas where escola like "%${escola}";`)
    rows = rows[0]

    if (rows == undefined){
      con.query(`insert into escolas(escola) values ("${escola}");`);
      var [rows] = await con.query(`select esc_cod from escolas where escola like "%${escola}";`)
      rows = rows[0]
    }
    var {esc_cod} = rows

    var [rows] = await con.query(`select fun_cod from funcionario where cpf like "%${cpf}";`)
    rows = rows[0]
    var fun_cod = rows.fun_cod

    con.query(`insert into emprego(fun_cod,esc_cod) values (${fun_cod},${esc_cod});`);
  }
}

const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require('node:child_process')
const schedule = require('node-schedule');


app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { nome } = req.body;
  const { email } = req.body;
  const { cpf } = req.body;
  var { nas_data } = req.body;
  const { tel_fixo } = req.body;
  const { tel_celular } = req.body;
  const { cep } = req.body;
  const { numero } = req.body;
  const { rua } = req.body;
  const { bairro } = req.body;
  const { cidade } = req.body;
  const { estado } = req.body;
  const { complemento } = req.body;
  const { escolas } = req.body;

  const dia = nas_data.substring(0,2)
  const mes = nas_data.substring(3,5)
  const ano = nas_data.substring(6,)
  var nas_data = ano + '-' + mes + '-' + dia

  insert_fun(nome,email,cpf,nas_data,tel_fixo,tel_celular,cep,numero,rua,bairro,cidade,estado,complemento)
  insert_esc(escolas,cpf)
});


var request = require('request-promise');
var a = new Array();
async function associados() {
    var data = {
        array: 1
    }
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/associados',
        body: data,
        json: true
    };
    var sendrequest = await request(options)
        .then(function (parsedBody) {
            result = parsedBody['result'];
            //console.log(result)
            return result
        })
        .catch(function (err) {
            console.log(err);
        });
        //console.log(r)
    return sendrequest
}

async function trechos(nomes) {
    var data = {
        array: nomes
    }
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/trechos',
        body: data,
        json: true
    };
    var sendrequest = await request(options)
        .then(function (parsedBody) {
            result = parsedBody['result'];
            //console.log(result)
            return result
        })
        .catch(function (err) {
            console.log(err);
        });
        //console.log(r)
    return sendrequest
}

var permissao = true
var x = ''
const job = schedule.scheduleJob('0 0 9 * * 2-6', function(){
  permissao = true
  // console.log('pemitido')
});

app.get("/pdf_inf", (req, resp) => {
  async function main() {
    if(permissao){x = await associados()
      // console.log('rodou')
      permissao = false}
    resp.send(x);
    }
  main()
    
});

// app.get("/pdf_ind", (req, resp) => {
//   async function main() {
//     var x = await associados()
//     var y = await trechos(x)
//     resp.send(y);
//     }
//   main()

// });


app.listen(3001, () => {
  console.log("rodando na porta 3001");
});