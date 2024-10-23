import XAPI, { Statement } from "@xapi/xapi";
import './styles.css';

const launchData = XAPI.getTinCanLaunchData();
console.log('Launch Data:', launchData);

let { endpoint="", auth } = launchData;
console.log('Endpoint:', endpoint);
console.log('Auth:', auth);

const xapi = new XAPI({
  endpoint: endpoint,
  auth: auth
});

console.log("xapi object: ", xapi);

const myStatement: Statement = {
  actor: {
    objectType: "Agent",
    name: "Test Agent",
    mbox: "mailto:hello@example.com"
  },
  verb: {
    id: "http://example.com/verbs/tested",
    display: {
        "en-GB": "tested"
    }
  },
  object: {
    objectType: "Activity",
    id: "https://github.com/xapijs/xapi"
  }
};
xapi.sendStatement({
  statement: myStatement
}).then(response => {
  console.log('Statement sent successfully:', response);
}).catch(error => {
  console.error('Error sending statement:', error);
});

