import Rebase from 're-base';
import firebase from 'firebase';

const config = {
		//this is where you should put your own config from

};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export { base }
