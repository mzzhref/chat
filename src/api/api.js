export const config = {};
config.baseUrl = 'http://' + window.location.hostname + ':3000';
config.api = {
    login: config.baseUrl + "/api/login",
    sign: config.baseUrl + "/api/sign",
}

export default { config };