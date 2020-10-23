/** @module HandleUser */

import User, { IUserModel } from '../../models/User';
import MainHelper from '../helpers/MainHelper';
import DateHelper from '../helpers/DateHelper';
import { response } from 'express';

interface IUser {
  _id: IUserModel['_id'];
  name: IUserModel['name'];
  email: IUserModel['email'];
  password: IUserModel['password'];
  subscription_plan_id: IUserModel['subscription_plan_id'];
  is_active: IUserModel['is_active'];
  status: IUserModel['status'];
  expiration_date: IUserModel['expiration_date']
}

class HandleUser {

  /**
   * Show user profile
   * @param id 
   */
  async profile(id: string) {
    try {
      const user = await <IUser><unknown>User.findById(id);
      if (!user)
        return { success: false, description: "Invalid ID", status: 400 };

      return { success: true, user, status: 200 };
      
    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  /**
   * Verifies if user already exists
   * @param email 
   * @param id 
   */
  async exists(email: string, id?: string) {
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

  /**
   * User signin
   * @param email 
   * @param password 
   */
  async signin(email: string, password: string) {
    try {
      const data = await User.findOne({ email: email });

      let user = <IUser><unknown>data;

      if (!user)
        return { success: false, description: "User does not exists", status: 400 };

      if (!await MainHelper.compare_encrypt(password, user.password))
        return { success: false, description: "Incorrect password", status: 400 };

      if (!user.is_active)
        return { success: false, description: "User is not active", status: 400 };

      if (!await DateHelper.is_before(user.expiration_date))
        return { success: false, description: "Expired user", status: 400 };

      const token = await MainHelper.generate_token(user._id);
      
      user.status = true;
      await data?.updateOne(user);

      return { success: true, user, token, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  /**
   * User signout
   * @param email 
   */
  async signout(email: string) {
    try {
      const data = await User.findOne({ email: email });
      let user = <IUser><unknown>data;

      user.status = false;
      await data?.updateOne(user);

      return { success: true, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  /**
   * User registration
   * @param name 
   * @param email 
   * @param password 
   * @param subscription_plan_id 
   */
  async register(name: string, email: string, password: string, subscription_plan_id: string) {
    try {
      if (!await MainHelper.validate_email(email))
        return { success: false, description: "Invalid email", status: 400 };
      
      if (await this.exists(email, ''))
        return { success: false, description: "User already exists", status: 400 };

      const pwd = await MainHelper.encrypt(password);

      const exp_date = await DateHelper.add(1, 'month');

      let user = <IUser>{
        name,
        email,
        password: pwd,
        subscription_plan_id: '5f9184b76b44592c80d3a419',
        expiration_date: exp_date
      };

      const create = await User.create(user);

      if (!create)
        return { success: false, description: "Internal Error", status: 500 };

      return { success: true, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  /**
   * Update user name and email
   * @param id 
   * @param name 
   * @param email 
   */
  async update(id:string, name: string, email: string) {
    try {
      if (!await MainHelper.validate_email(email))
        return { success: false, description: "Invalid email", status: 400 };

      if (await this.exists(email, id))
        return { success: false, description: "User already exists", status: 400 };

      const data = await User.findById(id);
      let user = <IUser><unknown>data;

      user.name = name;
      user.email = email;
      await data?.updateOne(user);

      return { success: true, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }

  /**
   * Remove user account
   * @param id 
   */
  async remove(id:string) {
    try {
      const exists = await this.profile(id);
      if (!exists.success)
        return { success: false, description: exists.description, status: 400 };

      await User.deleteOne({ _id: id });

      return { success: true, status: 200 };

    } catch(e) {
      return { error: true, description: e, status: 500 };
    }
  }
}

export default new HandleUser();
