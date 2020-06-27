const error = {
  error_reload_button: 'Ricarica la pagina',
  error_passedDownError_proposed_action: 'Azione proposta',
  error_passedDownError_text: 'Questo non era previsto!',
  error_passedDownError_title: 'Oops... ^^"',
}

const dates = {
  Sun: 'Dom',
  Mon: 'Lun',
  Tue: 'Mar',
  Wed: 'Mer',
  Thu: 'Gio',
  Fri: 'Ven',
  Sat: 'Sab',

  Jan: 'Gen',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Apr',
  May: 'Mag',
  Jun: 'Giu',
  Jul: 'Lug',
  Aug: 'Ago',
  Sep: 'Set',
  Oct: 'Ott',
  Nov: 'Nov',
  Dec: 'Dic',
}

const translation = {
  answers_title: 'Risultati',
  answers_correctAnswers01: 'Hai risposto correttamente a ',
  answers_correctAnswers02: ' domande',
  answers_text: 'Bravissimo/a! Continua così!',
  login_title: 'Inizio',
  login_text: 'Seleziona un quiz',
  login_name: 'Nome',
  login_check_button: 'Avvia',
  login_quizSelector_label: 'Seleziona un quiz',
  login_results_button: 'Risultati',
  login_editor_button: 'Editor',
  menuBar_home: 'Home',
  menuBar_login: 'Login',
  menuBar_logout: 'Logout',
  quizCreator_newQuizId_label: 'Scegli un quiz id',
  quizCreator_createQuiz: 'Crea',
  quizCreator_quizIdAlreadyUser_error: 'Quiz id già usato',
  quizEditor_questionText_label: 'Testo della domanda',
  quizEditor_save_button: 'Salva',
  quizEditor_answerText_label: 'Testo della risposta',
  quizEditor_quizTitle_label: 'Titolo del quiz',
  quizEditor_answersTime_label: 'Tempo della risposte',
  resultsTable_date_label: 'Data',
  resultsTable_name_label: 'Name',
  resultsTable_results_label: 'Risultati',
  resultsTable_title: 'Tabella dei risultati del quiz "',
}

const toPrice = price => {
  return String(price.toFixed(2)).replace('.', ',')
}

export const italian = {
  ...error,
  ...dates,
  ...translation,
  toPrice,
}
