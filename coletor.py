from bs4 import BeautifulSoup
import requests

def coletor(url, nome):
    r = requests.get(url)
    start = r.text.find('<div class="card shadow-sm resultadoBuscaItem">')
    end = r.text.find('<div class="rodape">')
    recorte = r.text[start:end]
    final = 0
    com_ex = '<a class="bg-light text-dark" style="text-decoration: none;" href="'
    fin_ex = len('" target="_blank">')
    links = [nome]
    c = 0
    while True:
        começo = recorte.find(com_ex) + len(com_ex)
        if começo == 66:
            break
        for k in recorte[começo:]:
            c+= 1
            if k == '>':
                final = começo+c
                links.append(('http://www.imprensaoficial.com.br/' + recorte[começo:final-fin_ex]).replace(' ', ''))
                recorte = recorte[final+1:]
                c = 0
                break
    return links

#a função recebe o nome da pessoa que esta sendo pesquisada apenas por referencia pois a lista retornada 
#tera o primeiro elemento como o nome assim organizando os links junto com o nome procurado