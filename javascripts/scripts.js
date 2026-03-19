showAndHidePlaylists()

function showAndHidePlaylists() {
    let obloshki = document.querySelectorAll('.obloshka')
    let obloshkiMini = document.querySelectorAll('.obloshka-mini')

    obloshkiMini.forEach((obloshkaMini) => {
        obloshkaMini.addEventListener('click', () => {
            obloshki.forEach((obloshka) => {
                obloshka.classList.add('none')
            })
            obloshkiMini.forEach((all) => {
                all.classList.remove('none')
            })

            obloshkaMini.classList.add('none')
            obloshkaMini.previousElementSibling.classList.remove('none')
        })
    })
}