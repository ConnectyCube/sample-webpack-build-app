
import ConnectyCube from 'connectycube'

const config = [
    { appId: 19, authKey: 'JHjjDn53msUDzX3', authSecret: 'AAnMKH7N3b4xX79' },
    { debug: { mode: 1 } }
]

ConnectyCube.init(...config)

const user = {
    id: 38120,
    login: "lemma",
    password: "youaintguessmypwd"
}

ConnectyCube.createSession(user, (error, session) => {
    let el = document.getElementById('printer')
    
    if (session) {
        el.innerHTML = JSON.stringify(session)
    } else {
        el.innerHTML = JSON.stringify(error)
    }
})