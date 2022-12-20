export default class ArrayUtil {
  static isEmpty<T>(data: T[]): boolean {
    if (data === null) {
      return true;
    }
    if (Array.isArray(data) && data.length === 0) {
      return true;
    }
    return false;
  }
}
