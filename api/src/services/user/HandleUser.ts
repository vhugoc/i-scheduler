/** @module HandleUser */

import User from '../../models/User';
import MainHelper from '../helpers/MainHelper';
import DateHelper from '../helpers/DateHelper';

class HandleUser {

  /**
   * Verifies if user already exists
   * @param email 
   * @param id 
   */
  async exists(email: string, id: string) {
    try {
      let exists;

      if (!id) {
        exists = await User.findOne({ email: email });
      } else {
        exists = await User.findOne({
          $and: [
            { email: { $eq: email } },
            { _id: { $ne: id } }
          ]
        });
      }

      if (exists)
        return true;

      return false;

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  async register(name: string, email: string, password: string, subscription_plan_id: string) {
    try {
      if (!await MainHelper.validate_email(email))
        return { success: false, description: "Invalid email", status: 400 };
      
      if (await this.exists(email, ''))
        return { success: false, description: "User already exists", status: 400 };

      const pwd = await MainHelper.encrypt(password);

      const exp_date = await DateHelper.add(1, 'month');

      const create = await User.create({
        name,
        email,
        password: pwd,
        subscription_plan_id: '5f9184b76b44592c80d3a419',
        expiration_date: exp_date
      });

      if (!create)
        return { success: false, description: "Internal Error", status: 500 };

      return { success: true, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }
}

export default new HandleUser();
