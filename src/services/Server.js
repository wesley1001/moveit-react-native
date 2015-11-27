import request from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import Settings from '../config/Settings'


class Server {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || Settings.getBaseUrlFor('test');
  }

  post(endPoint, data, callBack) {
    request
      .post(this.baseUrl + endPoint)
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res);
        callBack();
      });
    }

  get(endPoint, callBack) {
    request
    .get(endPoint)
    .end(function(err, res){
      return res;
    });
  }

}

export default Server;
