const poupopButton = document.querySelector(".poupopButton");
const backgroundBlur = document.querySelector(".bg-transparent");
const poupopInput = document.querySelector(".input");

//Arr onde será armazenado o histórico
let cupsHistory = [];

poupopButton.addEventListener("click", function meta() {
  //Validando entrada
  if (poupopInput.value.length == 0 && poupopInput.validity.valueMissing) {
    console.log(poupopInput.validity);

    poupopInput.setCustomValidity("Por favor, digite um valor válido!");
    poupopInput.reportValidity();

    return;
  } else {
    poupopInput.setCustomValidity("");

    const poupop = document.querySelector(".poupop-container");

    const metaDiaria = poupopInput.value;

    poupop.style.display = "none";
    backgroundBlur.style.display = "none";

    const before = document.querySelector(".before");
    const after = document.querySelector(".after");
    const countDOM = document.querySelector(".count");
    const audio = document.querySelector("audio");

    before.innerHTML = `${metaDiaria}`;
    countDOM.innerHTML = `0/${metaDiaria}`;

    const add = document.querySelector(".add");
    const historyDOM = document.querySelector(".history");

    //Convertedo meta para número
    let meta = parseInt(metaDiaria);
    //console.log(typeof meta);

    //Contador
    let count = 0;
    let id = 0;

    //Ajax
    const checkPage = new XMLHttpRequest();

    checkPage.open("GET", "/pages/check.html");
    checkPage.send();

    function addCups() {
      //incrementando +1 toda vez que for clicado
      count = count + 1;
      if (count == meta) {
        //Editando resposta do ajax
        const res = checkPage.response;
        const parser = new DOMParser();
        const resDOM = parser.parseFromString(res, "text/html");

        let body = document.querySelector("html");
        let bodyDOMres = resDOM.querySelector("body");

        //Iniciando tela de check
        body.replaceWith(bodyDOMres);

        //exibindo na tela
        after.innerHTML = `${count}`;
        countDOM.innerHTML = `${count}/${metaDiaria}`;
      } else if (count > meta) {
        return "ERRO";
      } else {
        //exibindo na tela
        after.innerHTML = `${count}`;
        countDOM.innerHTML = `${count}/${metaDiaria}`;

        //tocando áudio
        audio.play();
      }
    }
    function removeCups() {
      count = count - 1;
      removeProgressBarDOM();

      after.innerHTML = `${count}`;
      countDOM.innerHTML = `${count}/${metaDiaria}`;
    }
    const verifyDate = function () {
      //Função para capturar a hora e a data atual
      const date = new Date();

      let hour = `${date.getHours()}:${date.getMinutes()}`;
      let dayMonthYear = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return { hour, dayMonthYear };
    };

    //criando árvore e incrementando no DOM
    function addHistory() {
      //Criando um id para o obj que será passado para o arr
      cupsHistory.id = Math.random().toFixed(5);
      let id = cupsHistory.id;

      //criando elementos
      const divHistoryContainer = document.createElement("div");
      divHistoryContainer.classList.add("history-card");

      const h2 = document.createElement("h2");
      const h2Text = document.createTextNode("Você Bebeu");
      h2.appendChild(h2Text);

      const pDate = document.createElement("p");
      const pHour = document.createElement("p");

      let data = verifyDate().dayMonthYear;
      let hora = verifyDate().hour;

      const dateText = document.createTextNode(verifyDate().dayMonthYear);
      const hourText = document.createTextNode(verifyDate().hour);

      pDate.appendChild(dateText);
      pHour.appendChild(hourText);

      pDate.classList.add("date");

      const removeButton = document.createElement("img");
      removeButton.src = "/delete.svg";
      removeButton.classList.add("remove");

      const removeButtonText = document.createTextNode("Excluir do Histórico");
      removeButton.classList.add("remove");
      removeButton.appendChild(removeButtonText);

      divHistoryContainer.appendChild(h2);
      divHistoryContainer.appendChild(pDate);
      divHistoryContainer.appendChild(pHour);
      divHistoryContainer.appendChild(removeButton);
      historyDOM.appendChild(divHistoryContainer);

      //Adicionando histórico no arr
      cupsHistory.push({ data, hora, id });

      // console.log(cupsHistory);

      //Removendo árvore,histórico do arr e diminuindo count
      removeButton.addEventListener("click", () => {
        deletarArr(id);

        historyDOM.removeChild(divHistoryContainer);
        removeCups();
      });
    }

    //remover obj do array selecionando por ID
    function deletarArr(id) {
      //  console.log(cupsHistory);

      for (let i = 0; i < cupsHistory.length; i++) {
        if (cupsHistory[i].id == id) {
          cupsHistory.splice(i, 1);
        }
      }
    }

    //Aumentando Progresso da  barra
    function progressBar() {
      let progress = (count * 100) / meta;

      return progress.toFixed(2);
    }

    function progressBarDOM() {
      let barDOM = document.querySelector(".bar-line-blue");
      barDOM.style.width = `${progressBar().toString()}%`;

      //console.log(progressBar());
    }
    //Removendo progresso da barra
    function removeProgressBar() {
      let progress = [count * 100] / meta;
      return progress.toFixed(2);
    }
    function removeProgressBarDOM() {
      let barDOM = document.querySelector(".bar-line-blue");
      barDOM.style.width = `${removeProgressBar().toString()}%`;
    }

    add.addEventListener("click", () => {
      addCups();
      addHistory();
      progressBarDOM();
      removeProgressBar();
    });
  }
});

//Construindo PDF com dados do histórico
let y = 110;
const pdfButton = document.querySelector(".pdfButton");
pdfButton.addEventListener("click", function pdfGenerator() {
  if (cupsHistory.length == 0) {
    alert("Você não adicionou nenhum copo ao histórico!");
    return;
  } else {
    const image = document.querySelector(".agua"); // img HTML para redenrizar no pdf
    let doc = new jsPDF();

    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.text("Histórico de Copos de Água", 40, 25);
    doc.addImage(image, "JPG", 85, 40, 40, 40);

    for (let i = 0; i < cupsHistory.length; i++) {
      doc.setFontSize(20);
      doc.setFont("arial", "normal");
      doc.text(`${cupsHistory[i].data}`, 25, heigthDefine());
      doc.text(`${cupsHistory[i].hora}`, 25, heigthDefine());
      doc.text("1 copo bebido", 25, heigthDefine());
      doc.text("===============================", 25, heigthDefine());
    }
    function heigthDefine() {
      y = y + 10;
      return y;
    }
    //console.log(heigthDefine());
    doc.save("histórico.pdf");
  }
});
