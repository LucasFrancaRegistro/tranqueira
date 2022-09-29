import coletor from './coletor.js'
let s = 'abcdefahijk'
let f = s.substr(2).search('a')

var url ='http://www.imprensaoficial.com.br/DO/BuscaDO2001Resultado_11_3.aspx?filtropalavraschave=%22rodrigo+silva%22&f=xhitlist&xhitlist_vpc=first&xhitlist_x=Advanced&xhitlist_q=%5bfield+%27dc%3adatapubl%27%3a%3e%3d27.09.2022%3c%3d27.09.2022%5d(rodrigo%2bsilva)&filtrogrupos=Cidade+de+SP%2c+Executivo%2c+Junta+Comercial+&xhitlist_mh=9999&filtrodatafimsalvar=20220927&filtroperiodo=27%2f09%2f2022+a+27%2f09%2f2022&filtrodatainiciosalvar=20220927&filtrogrupossalvar=Cidade+de+SP%2c+Executivo%2c+Junta+Comercial+&xhitlist_hc=%5bXML%5d%5bKwic%2c3%5d&xhitlist_vps=15&filtrotodosgrupos=False&xhitlist_d=Cidade+de+SP%2c+Executivo%2c+Junta+Comercial+&filtrotipopalavraschavesalvar=UP&xhitlist_s=&xhitlist_sel=title%3bField%3adc%3atamanho%3bField%3adc%3adatapubl%3bField%3adc%3acaderno%3bitem-bookmark%3bhit-context&xhitlist_xsl=xhitlist.xsl'

let x = coletor(url)
console.log(coletor(url))