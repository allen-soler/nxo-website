const dateQuestion = document.getElementById('dateField');
const form = document.getElementById('form')
const firstName = document.getElementById('firstName')
const question = document.getElementById('userQuestion')
const email = document.getElementById('email')

dateQuestion.value = moment().format("YYYY-MM-DD")
dateQuestion.min = moment().format("YYYY-MM-DD")

const userFetch = (data) => {
    fetch('/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then((data) => {
            if (data)
                console.log(data)
        })
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    userFetch({ "name": firstName.value, "email": email.value, questions: [{ "question": question.value, "date": dateQuestion.value }] })
})
