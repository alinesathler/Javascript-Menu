let option;
let vacancyFilter;
let vacanciesList;
let i;
let totalCandidate;
let vacancy;
let vacanciesIndex = 1;
let jobList = [];
let vacancyView = "";
let candidate;
let candidateList = [];

function menu() {
  option = prompt(
    "Bem vindo ao Sistema de Vagas de Emprego.\n\n" +
      "Favor selecionar a opção desejada.\n" +
      "1 - Listar vagas disponíveis\n" +
      "2 - Criar uma nova vaga\n" +
      "3 - Visualizar uma vaga\n" +
      "4 - Inscrever candidato\n" +
      "5 - Excluir vaga\n" +
      "6 - Sair\n\n"
  );
  return option;
}

function searchVacancyIndex(vacancyIndex) {
  vacancyFilter = [];
  vacancyFilter = jobList.filter(function (jobList) {
    return jobList.index == vacancyIndex;
  });
}

function vacancies() {
  vacanciesList = "";
  i = 0;

  function jobSearch() {
    totalCandidate = 0;

    for (let index = 0; index < candidateList.length; index++) {
      if (candidateList[index].vacancy == jobList[i].index) {
        totalCandidate++;
      }
    }

    vacanciesList +=
      "Índice: " +
      jobList[i].index +
      "\n" +
      "Nome: " +
      jobList[i].name +
      "\n" +
      "Total de candidatos: " +
      totalCandidate +
      "\n\n";
    i++;

    return vacanciesList;
  }
  jobList.forEach(jobSearch);

  return vacanciesList;
}

function newVacancy() {
  vacancy = {};
  vacancy.index = vacanciesIndex;
  vacancy.name = prompt("Favor inserir o nome da vaga:\n");
  vacancy.description = prompt("Favor inserir a descrição da vaga:\n");
  vacancy.date = prompt("Favor inserir a data limite da vaga:\n");

  confirm(
    "Gostaria de salvar a vaga abaixo?\n\n" +
      "Índice: " +
      vacancy.index +
      "\n" +
      "Nome: " +
      vacancy.name +
      "\n" +
      "Descrição: " +
      vacancy.description +
      "\n" +
      "Data limite: " +
      vacancy.date
  );
  if (confirm) {
    vacanciesIndex++;
    return vacancy;
  }
}

function vacanciesView(vacancyIndex) {
  searchVacancyIndex(vacancyIndex);

  if (vacancyFilter != 0) {
    totalCandidate = 0;
    let candidatesNames = "";

    for (let index = 0; index < candidateList.length; index++) {
      if (candidateList[index].vacancy == vacancyFilter[0].index) {
        totalCandidate++;
        candidatesNames += candidateList[index].name + "\n";
      }
    }

    if (vacancyFilter) {
      vacancyView =
        "Índice: " +
        vacancyFilter[0].index +
        "\n" +
        "Nome: " +
        vacancyFilter[0].name +
        "\n" +
        "Descrição: " +
        vacancyFilter[0].description +
        "\n" +
        "Data limite: " +
        vacancyFilter[0].date +
        "\n" +
        "Total de candidatos: " +
        totalCandidate +
        "\n" +
        "Nomes dos candidados: " +
        "\n" +
        candidatesNames;
    }
    alert(vacancyView);
  } else {
    alert("Vaga inexistente");
  }
}

function newCandidate() {
  candidate = {};
  candidate.name = prompt("Favor inserir o nome do candidato:\n");
  candidate.vacancy = prompt("Favor inserir o índice da vaga:\n");

  searchVacancyIndex(candidate.vacancy);

  if (vacancyFilter != 0) {
    confirm(
      "Gostaria de salvar o candidato " +
        candidate.name +
        " na vaga abaixo?\n\n" +
        "Índice: " +
        jobList[candidate.vacancy - 1].index +
        "\n" +
        "Nome: " +
        jobList[candidate.vacancy - 1].name +
        "\n" +
        "Descrição: " +
        jobList[candidate.vacancy - 1].description +
        "\n" +
        "Data limite: " +
        jobList[candidate.vacancy - 1].date +
        "\n"
    );
    if (confirm) {
      return candidate;
    }
  } else {
    candidate = {};
    alert("Vaga inexistente.");
  }
}

function deleteVacancy(vacancyIndex) {
  searchVacancyIndex(vacancyIndex);

  if (vacancyFilter != 0) {
    confirm(
      "Realmente deseja escluir a vaga abaixo?\n\n" +
        "Índice: " +
        vacancyFilter[0].index +
        "\n" +
        "Nome: " +
        vacancyFilter[0].name +
        "\n" +
        "Descrição: " +
        vacancyFilter[0].description +
        "\n" +
        "Data limite: " +
        vacancyFilter[0].date
    );
    if (confirm) {
      jobList.indexOf(vacancyFilter[0]);
      jobList.splice(jobList.indexOf(vacancyFilter[0]), 1);
    }
  } else {
    alert("Vaga inexistente.");
  }
}

do {
  menu();
  switch (option) {
    case "1":
      vacancies();
      if (vacanciesList) {
        alert(vacanciesList);
      } else {
        alert("Não há vagas cadastradas.");
      }
      break;

    case "2":
      newVacancy();
      jobList.push(vacancy);
      break;

    case "3":
      vacanciesView(prompt("Favor inserir o índice da vaga:\n"));
      break;

    case "4":
      newCandidate();
      candidateList.push(candidate);
      break;

    case "5":
      deleteVacancy(prompt("Favor inserir o índice da vaga:\n"));
      break;

    case "6":
      alert("O programa será finalizado.");
      break;

    default:
      alert("Opção inválida.");
      break;
  }
} while (option !== "6");
