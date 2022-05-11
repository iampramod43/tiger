/**
 * Usage
 * return new SuccessReponse(null, 'HelloWorld'); // {msg:'HelloWorld',data:null,statusCode:200}
 * return new SuccessReponse([123123]);// {msg:'Success',data:[123123],statusCode:200}
 */
class SuccessReponse {
  constructor(data, msg, statusCode = 200) {
    this.data = data || null;
    this.msg = msg || 'Success';
    this.statusCode = statusCode;
  }
}
module.exports = SuccessReponse;
