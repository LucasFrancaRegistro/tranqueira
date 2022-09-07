export default function ler(texto: string, nomes: string[], separador: string){
	/*texto é a string que será lido, nomes é uma com as strings que o leitor vai procurar
	e separador é a string que o leitor usara como referencia para separar as substrings 
	(note que a string separador não estara nas substrings) 
	*/
    var sub_str = texto.split(separador)
    var info: string[] = []
    for (let i = 0; i < sub_str.length; i++){
        for (let n = 0; n < nomes.length; n++){
            if (sub_str[i].indexOf(nomes[n]) != -1){
                info.push(sub_str[i])
            }
        }
    }
    return info //retorna uma lista com as substrings que foram encontradas
}