export const config = {};
config.baseUrl = '//' + window.location.hostname + ':3000';
config.api = {
    login: config.baseUrl + "/api/login",
    sign: config.baseUrl + "/api/sign",
    chat: config.baseUrl + "/api/chat",
    chat_insert: config.baseUrl + "/api/chat_insert",
}

export default { config };