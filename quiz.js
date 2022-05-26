(function() {
  var questoes = [{
    Questão: '"Não é certo uma mulher ler. Logo começa a ter ideias, a pensar."',
    opcoes: ["A Bela e a Fera","Coraline e o Mundo Secreto", "Cinderela", "Branca de Neve","Enrolados"],
    respostaCorreta: 0
  }, {
    Questão: '“Às vezes é preciso aprender a correr antes de começar a andar."',
    opcoes: ["Vingadores: Ultimato","Homem de Ferro","Shrek","Capitão América","Esquadrão Suicida"],
    respostaCorreta: 1
  }, {
    Questão: '“É difícil para um homem bom ser rei.”',
    opcoes: ["O Senhor dos Anéis: O Retorno do Rei", "O Diário de uma Princesa", "Pantera Negra", "Eu Sou a Lenda","Rei Leão"],
    respostaCorreta: 2
  }, {
    Questão: '“Às quartas-feiras, nós usamos rosa.”',
    opcoes: ["As Patricinhas de Beverly Hills", "Diário de Uma Paixão", "Barraca do Beijo", "Meninas Malvadas","Barbie e o Castelo de Diamante"],
    respostaCorreta: 3
  }, {
    Questão: "É preciso ter coragem para enfrentar os inimigos e ainda mais para enfrentar os amigos.",
    opcoes: ["Harry Potter e o Cálice de Fogo", "Harry Potter e a Pedra Filosofal", "Harry Potter e o Enigma do Príncipe", "Harry Potter e a Câmara Secreta","Harry Potter e o Prisioneiro de Azkaban"],
    respostaCorreta: 1
    
  }];
 
  var QuestãoCounter = 0; 
  var selecao = [];
  var quiz = $('#quiz'); 
   /* 

            document.getElementById("opt1").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt2").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt3").innerHTML = questões[questãoCounter].opcoes
            document.getElementById("opt4").innerHTML = questões[questãoCounter].opcoes
           // document.getElementById("opt5").innerHTML = questões[questãoCounter].opcoes[4]
 */
         

    /* document.getElementById("opt1").onclick = () => {
        
        options.push("opt1")
        setAnswersStart()

    }
    document.getElementById("opt2").onclick = () => {

        options.push("opt2")
        setAnswersStart()
    

    }
    document.getElementById("opt3").onclick = () => {
        options.push("opt3")
        
        setAnswersStart()
    
    }
    document.getElementById("opt4").onclick = () => {
        options.push("opt4")
        setAnswersStart()
  
    }
    document.getElementById("opt5").onclick = () => {
        options.push("opt5")
        setAnswersStart()
    
    }
   */
  
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // Se o usuario nao selecionar opção, ele nao continua
    if (isNaN(selecao[QuestãoCounter])) {
      alert('Por favor, selecione uma opção!');
    } else {
      QuestãoCounter++;
      displayNext();
    }
  });
  
  //voltar a questao anterior
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    QuestãoCounter--;
    displayNext();
  });
  
  // fazer de novo
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    QuestãoCounter = 0;
    selecao = [];
    displayNext();
    $('#start').hide();
  });
  

  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  //questoes selecionadas
  function createQuestãoElement(index) {
    var qElement = $('<div>', {
      id: 'Questão'
    });
    
    var header = $('<h2>Questão ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var Questão = $('<p>').append(questoes[index].Questão);
    qElement.append(Questão);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questoes[index].opcoes.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questoes[index].opcoes[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // ler selecao
  function choose() {
    selecao[QuestãoCounter] = +$('input[name="answer"]:checked').val();
  }
  
 
  function displayNext() {
    quiz.fadeOut(function() {
      $('#Questão').remove();
      
      if(QuestãoCounter < questoes.length){
        var nextQuestão = createQuestãoElement(QuestãoCounter);
        quiz.append(nextQuestão).fadeIn();
        if (!(isNaN(selecao[QuestãoCounter]))) {
          $('input[value='+selecao[QuestãoCounter]+']').prop('checked', true);
        }
        
       
        if(QuestãoCounter === 1){
          $('#prev').show();
        } else if(QuestãoCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // pontuacao
  function displayScore() {
    var score = $('<p>',{id: 'Questão'});
    
    var nCorreto = 0;
    for (var i = 0; i < selecao.length; i++) {
      if (selecao[i] === questoes[i].respostaCorreta) {
        nCorreto++;
      }
    }
    
    score.append('Você acertou ' + nCorreto + ' questões de ' +
                 questoes.length + '!!!');
    return score;
  }
})();