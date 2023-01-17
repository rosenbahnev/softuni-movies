import {beginRequest, endRequest} from './notification.js'

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

export async function register(username, password){
    beginRequest();
     const result =  (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    endRequest();

    return result;
}

export async function login(username, password){
    beginRequest();

     const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    endRequest();

    return result;
}

export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken');
    localStorage.removeItem('userToken');

    const result =  fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();

    return result;

}

export async function getMovies()  {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result =  (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;

}

export async function getMovieById(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');
    
    const result = (await fetch(host(endpoints.MOVIE_BY_ID+id), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

export async function createMovie(movie) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result =  (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    endRequest();

    return result;

}

export async function updateMovie(id, updatedProps) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();

    return result;

}

export async function deleteMovie(id) {
    beginRequest();
    const token = localStorage.getItem('userToken');
    
    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        }
    })).json();
    
    endRequest();

    return result;

}

export async function getMovieByOwner(ownerId){
    beginRequest();

    const token = window.localStorage.getItem('userToken');
    
    const result =  (await fetch(host(endpoints.MOVIES +  `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application-json',
            'user-token': token
        }
    })).json()

    endRequest();

    return result;
}

export async function buyTicket(movie) {
    const newTickets = movie.ticlets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, {tickets: newTickets});

}