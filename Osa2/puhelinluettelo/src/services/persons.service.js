import axios from 'axios';
const apiBaseUrl = '/api/persons';

const getAll = () => axios
    .get(apiBaseUrl)
    .then(response => response.data);

const getOne = (id) => axios
    .get(`${apiBaseUrl}/${id}`)
    .then(response => response.data);

const create = (person) => axios
    .post(apiBaseUrl, person)
    .then(response => axios.get(response.headers.location))
    .then(response => response.data);

const update = (person) => axios
    .put(`${apiBaseUrl}/${person.id}`, person)
    .then(response => response.data);

const remove = (id) => axios
    .delete(`${apiBaseUrl}/${id}`)
    .then(response => response.data);

export default { getAll, getOne, create, update, remove };
