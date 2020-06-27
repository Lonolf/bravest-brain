import { put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

import firebaseConfig from 'config/firebase'
import * as actions from 'redux/actions'

class Firebase {
  constructor() {
    this.app = app.initializeApp(firebaseConfig)
    this.db = this.app.firestore()
    this.auth = this.app.auth()
    this.storage = this.app.storage()
    this.functions = this.app.functions('europe-west3')

    // app.setLogLevel('debug')
  }

  // user SAga
  // User Sagas

    getUser = () => {
      return new Promise((resolve, reject) => {
        this.auth.onAuthStateChanged((user) => {
          resolve(user)
        })
      })
    }

    * processUser() {
      const user = yield this.auth.currentUser

      let loggedUser = {}

      loggedUser.userId = user.uid
      loggedUser.userEmail = user.email
      loggedUser.userName = user.displayName

      return loggedUser
    }

    * autoSignIn() {
      let user = yield this.getUser()
      if (user)
        return yield this.processUser()

      return false
    }

    * signOut() {
      yield this.auth.signOut()
      return true
    }

    // general

  formatError = ({ err }) => {
    const error = new Error(err.message)
    error.name = err.name
    error.code = err.code
    return error
  }

  async getImageUrl({ bucketUrl }) {
    const reference = this.storage.refFromURL(bucketUrl)
    const url = await reference.getDownloadURL()
    return url
  }

  async checkDocumentExistenceAsync({ collectionId, docId }) {
    let response = await this.db.collection(collectionId).doc(docId).get()
    if (!response.exists)
      return false
    else
      return true
  }

  * callFunction({ functionName, data }) {
    const called = this.functions.httpsCallable(functionName)
    const response = yield called(data)
    if (response.data != null)
      return response.data
    else
      throw new Error('No data found')
  }

  * checkDocumentExistence({ collectionId, docId }) {
    let response = yield this.db.collection(collectionId).doc(docId).get()
    if (!response.exists)
      return false
    else
      return true
  }

  * getCollectionDoc({ collectionId = '', docId = '' }) {
    let response = yield this.db.collection(collectionId).doc(docId).get()
    if (!response.exists)
      throw new Error('Document ' + docId + ' not existing in collection ' + collectionId)
    else
      return response.data()
  }

  * addCollectionDoc({ collectionId, data, idName = 'id' }) {
    try {
      const doc = yield this.db.collection(collectionId).doc()
      data[idName] = doc.id
      yield doc.set(data)
      return { data }
    } catch (error) {
      yield put({ type: actions.ERROR, payload: { error } })
      return { error }
    }
  }

  * setCollectionDoc({ collectionId, docId, data }) {
    console.log(data)
    try {
      yield this.db.collection(collectionId).doc(docId).set(data)
      return true
    } catch (error) {
      return { error }
    }
  }

  * updateCollectionDoc({ collectionId, docId, keyId, data }) {
    try {
      yield this.db.collection(collectionId).doc(docId).update({
        [keyId]: data,
      })
      return true
    } catch (error) {
      yield put({ type: actions.ERROR, payload: { error } })
      return { error }
    }
  }

  * deleteCollectionDoc({ collection, doc }) {
    try {
      yield this.db.collection(collection).doc(doc).delete()
      return true
    } catch (error) {
      yield put({ type: actions.ERROR, payload: { error } })
      return { error }
    }
  }

  * deleteCollectionDocField({ collectionId, docId, keyId }) {
    try {
      yield this.db.collection(collectionId).doc(docId).update({
        [keyId]: app.firestore.FieldValue.delete(),
      })
      return { data: keyId }
    } catch (error) {
      yield put({ type: actions.ERROR, payload: { error } })
      return { error }
    }
  }

  * getSubCollection({ collectionId, docId, subCollectionId }) {
    try {
      let response = yield this.db.collection(collectionId).doc(docId).collection(subCollectionId).get()
      let data = []
      if (!response.empty && response.docs !== null)
        data = response.docs.map(doc => doc.data())
      return data
    } catch (error) {
      yield put({ type: actions.ERROR, payload: { error } })
      return { error }
    }
  }

  * createSubCollectionDoc({ collectionId, docId, subCollectionId, idName = 'id', data }) {
    const doc = yield this.db.collection(collectionId).doc(docId)
      .collection(subCollectionId).doc()
    data[idName] = doc.id
    yield doc.set(data)
    return true
  }

  * setSubCollectionDoc({ collectionId, docId, subCollectionId, subDocId, data }) {
    yield this.db.collection(collectionId).doc(docId)
      .collection(subCollectionId).doc(subDocId).set(data)
    return true
  }

  * setWatch({ projectId, collectionId, setChanges, setBulkChanges = () => {} } = {}) {
    const ref = this.db.collection(collectionId)
    const channel = eventChannel(emit => ref.onSnapshot(emit))
    try {
      while (true) {
        const data = yield take(channel)
        if (!setChanges)
          yield setBulkChanges(data.docChanges())
        else
          for (let change of data.docChanges())
            if (change.type === 'added' || change.type === 'modified' || change.type === 'removed')
              yield setChanges(change.doc.data(), change.type)
      }
    } catch (error) {
      yield put({ type: actions.ERROR, payload: error })
    }
  }

  dateToFirebaseTimestamp = (date) => {
    return app.firestore.Timestamp.fromDate(new Date(date))
  }
}

export default new Firebase()
