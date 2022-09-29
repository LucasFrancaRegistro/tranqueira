import requests

def coletor(url, info):
    r = requests.get(url)
    start = r.text.find('<div class="card shadow-sm resultadoBuscaItem">')
    end = r.text.find('<div class="rodape">')
    recorte = r.text[start:end]
    final = 0
    com_ex = '<a class="bg-light text-dark" style="text-decoration: none;" href="/DO/BuscaDO2001Documento'
    fin_ex = len('" target="_blank">')
    res = [info[0], info[1]]
    c = 0
    while True:
        começo = recorte.find(com_ex) + len(com_ex) + 5
        if começo == 95:
            break
        for k in recorte[começo:]:
            c+= 1
            if k == '>':
                final = começo+c
                res.append(('http://www.imprensaoficial.com.br/DO/GatewayPDF' + recorte[começo:final-fin_ex]).replace(' ', ''))
                recorte = recorte[final+1:]
                c = 0
                break
    return res