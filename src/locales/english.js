const error = {
  error_reload_button: 'Reload page',
  error_passedDownError_proposed_action: 'Proposed action',
  error_passedDownError_text: 'This was not in our plans!',
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
  answers_title: 'Results',
  answers_correctAnswers01: 'You answered correctly to ',
  answers_correctAnswers02: ' questions',
  answers_text: 'Good job!',
  login_title: 'Start',
  login_text: 'Select a quiz',
  login_name: 'Name',
  login_check_button: 'Start',
  login_quizSelector_label: 'Select a quiz',
  login_results_button: 'Results',
  login_editor_button: 'Editor',
  menuBar_home: 'Home',
  menuBar_login: 'Login',
  menuBar_logout: 'Logout',
  quizCreator_newQuizId_label: 'Choose a quizId',
  quizCreator_createQuiz: 'Make',
  quizCreator_quizIdAlreadyUser_error: 'Quiz id already used',
  quizEditor_questionText_label: 'Question',
  quizEditor_save_button: 'Save',
  quizEditor_answerText_label: 'Answer',
  quizEditor_quizTitle_label: 'Quiz title',
  quizEditor_answersTime_label: 'Max time of answers',
  resultsTable_date_label: 'Date',
  resultsTable_name_label: 'Name',
  resultsTable_results_label: 'Results',
  resultsTable_title: 'Table of results of the quiz "',
}
const toPrice = price => {
  return String(price.toFixed(2))
}

export const english = {
  ...error,
  ...dates,
  ...translation,
  toPrice,
}
