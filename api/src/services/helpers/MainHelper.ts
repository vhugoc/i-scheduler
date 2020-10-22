/** @module MainHelper */

class MainHelper {
  /**
   * Validate an email
   * @param email 
   */
  async validate_email(email: string) {
    const validator = require('email-validator');
    const response = await validator.validate(email);
    return response;
  }

  /**
   * Encrypt a string
   * @param string 
   */
  async encrypt(string: string) {
    const bcrypt = require('bcrypt');
    const response = await bcrypt.hash(string, 10);
    return response;
  }
  
  /**
   * Verifies an encrypted hash
   * @param string
   * @param hash 
   */
  async compare_encrypt(string: string, hash: string) {
    const bcrypt = require('bcrypt');
    const response = await bcrypt.compare(string, hash);
    return response;
  }

  /**
   * Generates an user token
   * @param id 
   */
  async generate_token(id: string) {
    const jwt = require('jsonwebtoken');
    const { secret } = require('../../configs/auth/auth.json');
    const response = await jwt.sign({ id: id }, secret, {
      expiresIn: 86400 * 7
    });
    return response;
  }
}

export default new MainHelper();
