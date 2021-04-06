import {Parse} from "parse/react-native";

module.exports = {
    applicationId: 'kYSoaP9C7d9JujPHMbZ4AIhtBTmmDIevX42cMQG6',
    javascriptKey: 'V1eJ6EjksQ6B95OJzOjTQBu0BNFjJIVw2YSkp9BS',
    serverURL: 'https://parseapi.back4app.com/'
}


export const liveQueryClient = new Parse.LiveQueryClient({
    applicationId: 'kYSoaP9C7d9JujPHMbZ4AIhtBTmmDIevX42cMQG6',
    serverURL: 'wss://' + 'chitchat.b4a.io',
    javascriptKey: 'V1eJ6EjksQ6B95OJzOjTQBu0BNFjJIVw2YSkp9BS'
});
liveQueryClient.open();





