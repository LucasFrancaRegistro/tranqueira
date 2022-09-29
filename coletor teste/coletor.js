import fetch from "node-fetch"

function coletor(link) {
    fetch(link)
.then(res => res.text())
.then(text => {
    //console.log(text)
    let rec_comeco = text.search('<div class="card shadow-sm resultadoBuscaItem">')
    let rec_fim = text.search('<div class="rodape">')
    var recorte = text.substring(rec_comeco, rec_fim)
    let link_comeco = '<a class="bg-light text-dark" style="text-decoration: none;" href="/DO/BuscaDO2001Documento'
    let link_fim = '" target="_blank">'
    var lista_links = []
    while (true) {
        if(recorte.search(link_comeco) == -1){break}
        let comeco = recorte.search(link_comeco) + link_comeco.length + 5
        let pos_comeco = recorte.substr(comeco)
        let link = pos_comeco.substring(0, pos_comeco.search(link_fim))
        lista_links.push('http://www.imprensaoficial.com.br/DO/GatewayPDF' + link)
        let resto = recorte.substring(0, comeco + link.length + link_fim.length)
        recorte = recorte.substr(resto.length)
    }
    return lista_links
})
.catch(err => console.log(err));
}


export default coletor