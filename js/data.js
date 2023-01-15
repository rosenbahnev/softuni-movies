function host(endpoint) {
    return `https://api.backendless.com/8437C1A8-6541-C39B-FF0B-6D084FB90F00/046A7A56-BEE0-43DA-AA88-BD4185E3DB7D/${endpoint}`;
}

const endpoints = {
    REGISTER:'users/register',
    LOGIN:'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

async function register(username, password){
     return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json()
}

async function login(username, password){
     const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
}

function logout() {
    const token = localStorage.getItem('userToken');
    return fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

async function getMovies()  {
    const token = localStorage.getItem('userToken');

    return await (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}

async function getMovieById(id) {
    const token = localStorage.getItem('userToken');
    
    return await (await fetch(host(endpoints.MOVIE_BY_ID+id), {
        headers: {
            'user-token': token
        }
    })).json();
}

async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

}

async function updateMovie(id, updatedProps) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

}

async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');
    
    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        }
    })).json();
    
}

async function getMovieByOwner(ownerId){
    const token = window.localStorage.getItem('userToken');
    return (await fetch(host(endpoints.MOVIES +  `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        }
    })).json()
}

async function buyTicket(movie) {
    const newTickets = movie.ticlets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, {tickets: newTickets});

}