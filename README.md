# Contador de Copos de Água
 Aplicação Web baseado em Javascript

![Design preview for the Rock, Paper, Scissors coding challenge](https://github.com/Abraao2501/agua_count/blob/main/design%20desktop.PNG)

## Bem-vindo(a)! 👋

Este projeto é um contador de copos de água onde o usuário poderá registrar toda vez que ele ingerir um copo**

As tecnologias utilizadas nesse jogo foram:

[HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)

[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

[Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Tecnologias utilizadas

* [jsPDF](https://github.com/MrRio/jsPDF)(Biblioteca javascript para geração e formatação de PDFs)
* Ajax(Carregamento assíncrono do Javascript por meio do objeto XMLHttpRequest)
* Validação de Inputs
* Manipulação da API DOM(Document Object Model)

## Aprendizado Principal do Projeto: jsPDF - Como foi implementado

Abaixo segue o código referente à biblioteca utilizada para gerar um documwento pdf com dados do histórico do usuário

```javascript
    //Instanciando um novo objeto doc
    let doc = new jsPDF();

    //Adiconando Cabeçalho
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.text("Histórico de Copos de Água", 40, 25);
    doc.addImage(image, "JPG", 85, 40, 40, 40);

    //Laço para percorrer cada histórico do usuário e adicionando no PDF
    for (let i = 0; i < cupsHistory.length; i++) {
      doc.setFontSize(20);
      doc.setFont("arial", "normal");
      doc.text(`${cupsHistory[i].data}`, 25, heigthDefine());
      doc.text(`${cupsHistory[i].hora}`, 25, heigthDefine());
      doc.text("1 copo bebido", 25, heigthDefine());
      doc.text("===============================", 25, heigthDefine());
    }
```

O código acima gera o seguinte PDF:

<img src="https://github.com/Abraao2501/agua_count/blob/main/pdf.PNG" alt="PDF image" style="width:100px; height:400px;"/>

## Responsividade

O layout do sistema esá totalmente responsivo para dispositivos móveis


![Mobile Design](https://github.com/Abraao2501/agua_count/blob/main/design%20mobile.jpeg)

## Quer experimentar?

O site foi hospedado no sistema de hospedagem da [Vercel](https://vercel.com/)

Clique [aqui](https://agua-count.vercel.app/) para acessar o site!
