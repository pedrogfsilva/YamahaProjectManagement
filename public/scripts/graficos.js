let arrAlloc = [];

let hoursAllocFuncJan = 0;
let hoursAllocFuncFeb = 0;
let hoursAllocFuncMar = 0;
let hoursAllocFuncApr = 0;
let hoursAllocFuncMay = 0;
let hoursAllocFuncJun = 0;
let hoursAllocFuncJul = 0;
let hoursAllocFuncAug = 0;
let hoursAllocFuncSep = 0;
let hoursAllocFuncOct = 0;
let hoursAllocFuncNov = 0;
let hoursAllocFuncDec = 0;


let hoursDisFuncYamahaJan = 0;
let hoursDisFuncYamahaFeb = 0;
let hoursDisFuncYamahaMar = 0;
let hoursDisFuncYamahaApr = 0;
let hoursDisFuncYamahaMay = 0;
let hoursDisFuncYamahaJun = 0;
let hoursDisFuncYamahaJul = 0;
let hoursDisFuncYamahaAug = 0;
let hoursDisFuncYamahaSep = 0;
let hoursDisFuncYamahaOct = 0;
let hoursDisFuncYamahaNov = 0;
let hoursDisFuncYamahaDec = 0;


let hoursDisAllFuncJan = 0;
let hoursDisAllFuncFeb = 0;
let hoursDisAllFuncMar = 0;
let hoursDisAllFuncApr = 0;
let hoursDisAllFuncMay = 0;
let hoursDisAllFuncJun = 0;
let hoursDisAllFuncJul = 0;
let hoursDisAllFuncAug = 0;
let hoursDisAllFuncSep = 0;
let hoursDisAllFuncOct = 0;
let hoursDisAllFuncNov = 0;
let hoursDisAllFuncDec = 0;

let workloadNeed = 0;
let highestAlloc = 0;
let highestAllocMinusAllHours = 0;


function generateWorkloadGraph(){
let barGrafico = document.getElementById("barGrafico");
const config = {
  type: "line",
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
    },
  },
  data: {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho ",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "humanResources",
        data: [
          hoursAllocFuncJan, hoursAllocFuncFeb, hoursAllocFuncMar, hoursAllocFuncApr, hoursAllocFuncMay, hoursAllocFuncJun, hoursAllocFuncJul, hoursAllocFuncAug, hoursAllocFuncSep, hoursAllocFuncOct, hoursAllocFuncNov,
          hoursAllocFuncDec,
        ],
        backgroundColor: [" #247BA0"],
        borderColor: " #0A2463",
        fill: true,
        order: 2,
      },
      {
        label: "Workload Needed",
        data: [
          workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed, workloadNeed,
          workloadNeed,
        ],
        type: "line",
        borderColor: "#CCCC00",
        order: 1,
      },
      {
        label: "IT Limitation Internal and third parties",
        data: [
          hoursDisAllFuncJan, hoursDisAllFuncFeb, hoursDisAllFuncMar, hoursDisAllFuncApr, hoursDisAllFuncMay, hoursDisAllFuncJun, hoursDisAllFuncJul, hoursDisAllFuncAug, hoursDisAllFuncSep, hoursDisAllFuncOct,
          hoursDisAllFuncNov, hoursDisAllFuncDec
        ],
        type: "line",
        borderColor: "#FB3640",
        order: 1,
      },
      {
        label: "IT Limitation only with internal resources",
        data: [
          hoursDisFuncYamahaJan, hoursDisFuncYamahaFeb, hoursDisFuncYamahaMar, hoursDisFuncYamahaApr, hoursDisFuncYamahaMay, hoursDisFuncYamahaJun, hoursDisFuncYamahaJul, hoursDisFuncYamahaAug, hoursDisFuncYamahaSep, hoursDisFuncYamahaOct, hoursDisFuncYamahaNov, hoursDisFuncYamahaDec
        ],
        type: "line",
        borderColor: "#FB3640",
        order: 1,
      },
    ],
  },
};

let myGraph = new Chart(barGrafico, config);
}


let ajaxWorkload = new XMLHttpRequest();
ajaxWorkload.open('GET', '/alocation', true);

ajaxWorkload.onreadystatechange = () =>{
  if(ajaxWorkload.status === 200 && ajaxWorkload.readyState === 4){
    let response = JSON.parse(ajaxWorkload.responseText);
    for(let i = 0; i < response.length; i++){
        hoursAllocFuncJan += response[i].HorasJaneiro
        hoursAllocFuncFeb += response[i].HorasFevereiro
        hoursAllocFuncMar += response[i].HorasMarco
        hoursAllocFuncApr += response[i].HorasAbril
        hoursAllocFuncMay += response[i].HorasMaio
        hoursAllocFuncJun += response[i].HorasJunho
        hoursAllocFuncJul += response[i].HorasJulho
        hoursAllocFuncAug += response[i].HorasAgosto
        hoursAllocFuncSep += response[i].HorasSetembro
        hoursAllocFuncOct += response[i].HorasOutubro
        hoursAllocFuncNov += response[i].HorasNovembro
        hoursAllocFuncDec += response[i].HorasDezembro

        if(response[i].FuncionarioYamaha === 1){
          console.log(response[i]);
          hoursDisFuncYamahaJan += response[i].HorasProjetos
          hoursDisFuncYamahaFeb += response[i].HorasProjetos
          hoursDisFuncYamahaMar += response[i].HorasProjetos
          hoursDisFuncYamahaApr += response[i].HorasProjetos
          hoursDisFuncYamahaMay += response[i].HorasProjetos
          hoursDisFuncYamahaJun += response[i].HorasProjetos
          hoursDisFuncYamahaJul += response[i].HorasProjetos
          hoursDisFuncYamahaAug += response[i].HorasProjetos
          hoursDisFuncYamahaSep += response[i].HorasProjetos
          hoursDisFuncYamahaOct += response[i].HorasProjetos
          hoursDisFuncYamahaNov += response[i].HorasProjetos
          hoursDisFuncYamahaDec += response[i].HorasProjetos
        }

        hoursDisAllFuncJan += response[i].HorasProjetos
        hoursDisAllFuncFeb += response[i].HorasProjetos
        hoursDisAllFuncMar += response[i].HorasProjetos
        hoursDisAllFuncApr += response[i].HorasProjetos
        hoursDisAllFuncMay += response[i].HorasProjetos
        hoursDisAllFuncJun += response[i].HorasProjetos
        hoursDisAllFuncJul += response[i].HorasProjetos
        hoursDisAllFuncAug += response[i].HorasProjetos
        hoursDisAllFuncSep += response[i].HorasProjetos
        hoursDisAllFuncOct += response[i].HorasProjetos
        hoursDisAllFuncNov += response[i].HorasProjetos
        hoursDisAllFuncDec += response[i].HorasProjetos
    }
    arrAlloc.push(hoursAllocFuncJan);
    arrAlloc.push(hoursAllocFuncFeb);
    arrAlloc.push(hoursAllocFuncMar);
    arrAlloc.push(hoursAllocFuncApr);
    arrAlloc.push(hoursAllocFuncMay);
    arrAlloc.push(hoursAllocFuncJun);
    arrAlloc.push(hoursAllocFuncJul);
    arrAlloc.push(hoursAllocFuncAug);
    arrAlloc.push(hoursAllocFuncSep);
    arrAlloc.push(hoursAllocFuncOct);
    arrAlloc.push(hoursAllocFuncNov);
    arrAlloc.push(hoursAllocFuncDec);

    arrAlloc.sort((a, b) => a - b);
    highestAlloc = arrAlloc[arrAlloc.length - 1];
    highestAllocMinusAllHours = (highestAlloc - hoursDisAllFuncJan) / 2;
    workloadNeed = highestAllocMinusAllHours + hoursDisAllFuncJan

    generateWorkloadGraph();


    $('#tableGraph').append(`
<tr>
  <td>Janeiro</td>
  <td>${hoursAllocFuncJan}</td>
</tr>
<tr>
  <td>Fevereiro</td>
  <td>${hoursAllocFuncFeb}</td>
</tr>
<tr>
  <td>Março</td>
  <td>${hoursAllocFuncMar}</td>
</tr>
<tr>
  <td>Abril</td>
  <td>${hoursAllocFuncApr}</td>
</tr>
<tr>
  <td>Maio</td>
  <td>${hoursAllocFuncMay}</td>
</tr>
<tr>
  <td>Junho</td>
  <td>${hoursAllocFuncJun}</td>
</tr>
<tr>
  <td>Julho</td>
  <td>${hoursAllocFuncJul}</td>
</tr>
<tr>
  <td>Agosto</td>
  <td>${hoursAllocFuncAug}</td>
</tr>
<tr>
  <td>Setembro</td>
  <td>${hoursAllocFuncSep}</td>
</tr>
<tr>
  <td>Outubro</td>
  <td>${hoursAllocFuncOct}</td>
</tr>
<tr>
  <td>Novembro</td>
  <td>${hoursAllocFuncNov}</td>
</tr>
<tr>
  <td>Dezembro</td>
  <td>${hoursAllocFuncDec}</td>
</tr>
`)
  }
}

ajaxWorkload.send();



// variáveis que armazenam as quantidades de projetos em cada mês
let january = 0;
let february = 0;
let march = 0;
let april = 0;
let may = 0;
let june = 0;
let july = 0;
let august = 0;
let september = 0;
let october = 0;
let november = 0;
let december = 0;

// função que cria o gráfico quantidade de projetos por mês
function generateDataProjects() {
let mixedGrafico = document.getElementById("mixedGrafico"); 
const confige = {
  type: "bar",
  data: {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho ",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Quantidade de projetos por mês",
        data: [
          january, february, march, april, may, june, july, august, september, october, november, december,
        ],
        backgroundColor: [" #247BA0"],
      },
    ],
  },
};
  let myGrapho = new Chart(mixedGrafico, confige);
}

// requisição ajax que retorna todos os projetos cadastrados no banco de dados
let ajax2 = new XMLHttpRequest();
ajax2.open("GET", "/projects", true);

ajax2.onreadystatechange = () => {
  if (ajax2.status === 200 && ajax2.readyState === 4) {
    let response = JSON.parse(ajax2.responseText);
    for (let i = 0; i < response.length; i++) {
      let month = parseInt(response[i].DataInicial.slice(5, 7));
      // percorre cada projeto e incrementa a variável de acordo com o mês do projeto
      if (month === 1) {
        january++;
      }
      if (month === 2) {
        february++
      }

      if(month === 3){
        march++
      }

      if(month === 4){
        april++
      }

      if(month === 5){
        may++
      }

      if(month === 6){
        june++
      }

      if(month === 7){
        july++
      }

      if(month === 8){
        august++
      }

      if(month === 9){
        september++
      }

      if(month === 10){
        october++
      }

      if(month === 11){
        november++
      }

      if(month === 12){
        december++
      }
    }
    // chamando a função que gera o gráfico quantidade de projetos
    generateDataProjects();
  }
};
// envia a requisição ajax
ajax2.send();
