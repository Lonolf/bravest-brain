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
  login_title: 'Inizio',
  login_text: 'Inserisci i tuoi dati',
  login_name: 'Nome',
  login_check_button: 'Avvia',
  answers_title: 'Risultati',
  answers_correctAnswers01: 'Hai risposto correttamente a ',
  answers_correctAnswers02: ' domande',
  answers_text: 'Bravissimo! Continua così!',
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
