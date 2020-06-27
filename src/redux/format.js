export const formatQuiz = ({
  userId = '',
  quizId = '',
}) => {
  return ({
    userId,
    answersTime: 60000,
    obfuscateResults: true,
    quizTitle: quizId,
    quizId,
    questions: {
      1: {
        answers: {
          1: {
            answerId: '1',
            correct: false,
            text: 'Wrong answer',
          },
          2: {
            answerId: '2',
            correct: true,
            text: 'Correct answer',
          },
        },
        questionId: '2',
        questionText: 'Question',
        type: 'multipleChoices',
      },
    },
  })
}

export const formatError = ({ message = 'notFormattedError', name, code }) => {
  const error = new Error(message)
  if (name != null) error.name = name
  if (code != null) error.code = code
  return error
}

export const formatFirebaseError = ({ firebaseError }) => {
  if (firebaseError.name !== 'FirebaseError')
    return firebaseError

  const error = new Error(firebaseError.message)
  error.name = firebaseError.name
  error.code = firebaseError.code
  error.serverResponse = firebaseError.serverResponse
  return error
}
