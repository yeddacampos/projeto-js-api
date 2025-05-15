const clientID = 'f24a7a7c6f1f4277bc0b31531f158f4a';
const clientSecret = 'b613d3cf4851400198c7c94ecb0bd84a';

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

    const data = await response.json();
    return data.access_token;
}

async function obterTopAlbunsDoArtista(nomeDoArtista) {
    const token = await obterAcessoToken();

    const buscaArtista = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(nomeDoArtista)}&type=artist&limit=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const dadosBusca = await buscaArtista.json();
    if (dadosBusca.artists.items.length === 0) {
        alert("Artista não encontrado.");
        return;
    }

    const artistaId = dadosBusca.artists.items[0].id;

    const respostaTopTracks = await fetch(`https://api.spotify.com/v1/artists/${artistaId}/top-tracks?market=BR`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const topTracks = await respostaTopTracks.json();

    const albunsUnicos = [];
    const nomesAlbuns = new Set();

    for (let faixa of topTracks.tracks) {
        const nomeAlbum = faixa.album.name;
        if (!nomesAlbuns.has(nomeAlbum)) {
            nomesAlbuns.add(nomeAlbum);
            albunsUnicos.push({
                nome: nomeAlbum,
                imagem: faixa.album.images[0]?.url,
                link: faixa.album.external_urls.spotify
            });
        }
    }

    const top3Albuns = albunsUnicos.slice(0, 3);
    mostrarAlbunsNaTela(top3Albuns);
}

function mostrarAlbunsNaTela(albuns) {
    const lista = document.getElementById('lista-albuns');
    lista.innerHTML = ''; // Limpa conteúdo anterior

    albuns.forEach(album => {
        const item = document.createElement('li');
        item.innerHTML = `
            <a href="${album.link}" target="_blank" style="text-decoration:none; color:inherit;">
                <img class="capaAlbum" src="${album.imagem}" alt="album-icon">
                <p>${album.nome}</p>
            </a>
        `;
        lista.appendChild(item);
    });
}

function botaoDeBusca() {
    const input = document.getElementById('input-busca').value;
    if (input.trim() !== '') {
        obterTopAlbunsDoArtista(input);
    }
}

// Suas funções de animação continuam funcionando normalmente
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
        abrirInput();
    } else {
        fechatInput();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fechatInput();
});
