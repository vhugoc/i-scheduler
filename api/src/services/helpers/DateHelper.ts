/** @module DateHelper */
const dayjs = require('dayjs');

class DateHelper {
  /**
   * Returns now
   */
  async now() {
    const response = await dayjs().format('YYYY-MM-DD hh:mm');
    return response;
  }

  /**
   * Add days/months/years
   * @param amount 
   * @param unit 
   */
  async add(amount: number, unit: string) {
    const response = await dayjs().add(amount, unit).format('YYYY-MM-DD hh:mm');
    return response;
  }
  
  /**
   * Subtract days/months/years
   * @param amount 
   * @param unit 
   */
  async subtract(amount: number, unit: string) {
    const response = await dayjs().subtract(amount, unit).format('YYYY-MM-DD hh:mm');
    return response;
  }

  async is_before(date: Date) {
    const response = await dayjs().isBefore(date);
    return response;
  }
}

export default new DateHelper();
