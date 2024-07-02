import axios from 'axios';
const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDY5NjhlYzcyNWE1MjMxMGFjMTYxZWM4ZDc3ZWMzNSIsIm5iZiI6MTcxOTA4MTUyNy41NDY4ODYsInN1YiI6IjY2NzcxMzIyMTlkMjYzMGE4ZWMwMTcyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2NBS50NlOQyAcY954tGspNCK6rCT0xYRDJ7FhBSHdVQ'
      },

})
export default instance;