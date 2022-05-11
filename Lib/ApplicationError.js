/**
 * Usage
 * let er = new InstaError('HelloWorld');
 * let erwithOption = new InstaError('HelloWorld', 200);
 * console.log(erwithOption.stack)
 * console.log(er.message, er.statusCode, er.stack);
 * console.log(erwithOption.message, erwithOption.statusCode);
 */
class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

module.exports = ApplicationError;
