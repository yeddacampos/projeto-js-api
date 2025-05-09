
const clientID = 'f24a7a7c6f1f4277bc0b31531f158f4a';
const clientSecret = 'b613d3cf4851400198c7c94ecb0bd84a';

function botaoDeBusca() {
    const input = document.getElementById('input-busca').value;

}

function abrirInput() {
    document.getElementById('input-busca').style.visibility = 'hidden';
    document.getElementById('input-busca').style.width = '40px';
    document.getElementById('input-busca').style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
}

function fechatInput() {
    document.getElementById('input-busca').style.visibility = 'visible';
    document.getElementById('input-busca').style.width = '300px';
    document.getElementById('input-busca').style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
}

function movimentoInput() {
    const visibility = document.getElementById('input-busca').style.visibility;

    if (visibility === 'hidden') {
        abrirInput()
    } else {
        fechatInput()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fechatInput()
})

async function obterAcessoToken() {
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json()
    return data.acess_token;


}

async function obterAlbuns() {
    const accessToken = await obterAcessoToken();

    const url = "https://api.spotify.com/v1/me/shows?offset=0&limit=20"

    const resultado = await fetch('')
}